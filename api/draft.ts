import { endpoint } from './_lib';
import { DraftRequest, DraftResult } from '../src/ai/schemas';
import { mockDraft } from '../src/ai/mocks';
export default endpoint({ name: 'letter', request: DraftRequest, result: DraftResult, mock: mockDraft, instructions: 'Write the letter specified by template and tone, with subject, en and ar. Arabic is a faithful formal translation. Use only provided context. Use square-bracket placeholders for missing facts, dates, salaries, rent, attachments and signatories. Do not claim documents are attached or agreements signed unless the context explicitly confirms this.' });
