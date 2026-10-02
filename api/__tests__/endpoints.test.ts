import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { VercelRequest, VercelResponse } from '@vercel/node';
const { parse } = vi.hoisted(() => ({ parse: vi.fn() }));
vi.mock('openai', () => ({ default: class { responses = { parse }; } }));
import explain from '../explain';
import draft from '../draft';
import extract from '../extract';
import whatif from '../whatif';
import { PRESET_A } from '../../src/data/presets';
import { ExplainResult, DraftResult, ExtractResult, WhatIfResult } from '../../src/ai/schemas';
import { mockExplain } from '../../src/ai/mocks';
const explanation = { nodeId: 'bank_account', label: 'Corporate bank account', owner: 'bank', startDay: 35, finishDay: 75.4, expectedDays: 40.4, onCriticalPath: true, unlocks: 20, companyName: 'Northline Payments', zone: 'ADGM', source: 'Published planning range.' };
const current = { zone: 'ADGM', headcount: 12, toggles: PRESET_A.toggles, bankable: { ...PRESET_A.bankable } };
async function call(handler: typeof explain, body: unknown, method = 'POST') {
  const result = { status: 0, headers: {} as Record<string, string>, body: undefined as unknown };
  const response = { setHeader(name: string, value: string) { result.headers[name] = value; }, status(code: number) { result.status = code; return response; }, json(value: unknown) { result.body = value; return response; } };
  await handler({ method, body, headers: {} } as VercelRequest, response as unknown as VercelResponse);
  return result;
}
// All endpoint implementations share the same request/response signature.
const invoke = (handler: unknown, body: unknown, method?: string) => call(handler as typeof explain, body, method);
beforeEach(() => { vi.stubEnv('OPENAI_API_KEY', ''); vi.stubEnv('OPENAI_MODEL', ''); parse.mockReset(); });
afterEach(() => { vi.unstubAllEnvs(); });
describe('AI boundary', () => {
  it('rejects non-POST, malformed JSON, invalid schemas and oversized bodies', async () => {
    expect((await call(explain, explanation, 'GET')).status).toBe(405);
    expect((await call(explain, '{bad')).status).toBe(400);
    expect((await call(explain, {})).status).toBe(400);
    expect((await call(explain, 'x'.repeat(4 * 1024 * 1024 + 1))).status).toBe(413);
    expect(parse).not.toHaveBeenCalled();
  });
  it('serves validated bilingual explanations without a key', async () => {
    const result = await call(explain, explanation);
    expect(result.status).toBe(200); expect(result.headers['x-ai-mode']).toBe('mock');
    expect(ExplainResult.parse(result.body).en).toContain('40.4');
  });
  it('drafts with placeholders rather than invented rent', async () => {
    const result = await invoke(draft, { template: 'employer_rent_guarantee', tone: 'formal', context: { companyName: 'Northline' } });
    expect(DraftResult.parse(result.body).en).toContain('[rent]');
  });
  it('never fabricates evidence for an unread document in demo mode', async () => {
    const result = await invoke(extract, { files: [{ name: 'sample.pdf', mimeType: 'application/pdf', base64: 'YQ==' }] });
    const parsed = ExtractResult.parse(result.body); expect(parsed.confidence).toBe(0); expect(parsed.evidence).toEqual([]);
    expect((await invoke(extract, { files: [{ name: 'script', mimeType: 'text/javascript', base64: 'YQ==' }] })).status).toBe(400);
  });
  it('reads live headers, disables storage and validates model output', async () => {
    vi.stubEnv('OPENAI_API_KEY', 'test'); vi.stubEnv('OPENAI_MODEL', 'test-model');
    parse.mockResolvedValue({ output_parsed: mockExplain(explanation) });
    const result = await call(explain, explanation); expect(result.headers['x-ai-mode']).toBe('live');
    expect(parse.mock.calls[0][0]).toMatchObject({ store: false, model: 'test-model' });
    parse.mockResolvedValue({ output_parsed: { invalid: true } });
    expect((await call(explain, explanation)).headers['x-ai-mode']).toBe('mock');
  });
  it('normalizes nullable strict what-if output to untouched fields', async () => {
    vi.stubEnv('OPENAI_API_KEY', 'test'); vi.stubEnv('OPENAI_MODEL', 'test-model');
    parse.mockResolvedValue({ output_parsed: { toggles: { kycEarly: true, chequeFree: null, flexiDesk: null }, bankable: null, zone: null, headcount: null, events: null, rationale: 'Prepare earlier.' } });
    const result = await invoke(whatif, { question: 'prepare KYC early', current });
    expect(WhatIfResult.parse(result.body)).toEqual({ toggles: { kycEarly: true }, rationale: 'Prepare earlier.' });
  });
  it('falls back on API failure and understands disabled decisions', async () => {
    vi.stubEnv('OPENAI_API_KEY', 'test'); vi.stubEnv('OPENAI_MODEL', 'test-model'); parse.mockRejectedValue(new Error('Unavailable'));
    const result = await invoke(whatif, { question: 'disable KYC early', current });
    expect(result.headers['x-ai-mode']).toBe('mock'); expect(WhatIfResult.parse(result.body).toggles?.kycEarly).toBe(false);
  });
});
