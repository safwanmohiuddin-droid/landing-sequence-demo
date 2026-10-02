import { z } from 'zod';
import { endpoint } from './_lib.js';
import { WhatIfRequest, WhatIfResult } from '../src/ai/schemas.js';
import { mockWhatIf } from '../src/ai/mocks.js';
// Strict Structured Outputs needs named, required keys. Nullable wire fields
// are omitted before validating with the frozen public result contract.
const Wire = z.object({
  toggles: z.object({ kycEarly: z.boolean().nullable(), chequeFree: z.boolean().nullable(), flexiDesk: z.boolean().nullable() }).nullable(),
  bankable: z.object({ q1_layers: z.union([z.literal(1), z.literal(2), z.literal(3)]).nullable(), q2_parent: z.enum(['UAE', 'LOW_RISK', 'HIGH_RISK']).nullable(), q3_uaeSignatory: z.boolean().nullable(), q4_activityMatches: z.boolean().nullable(), q5_sourceOfFundsPack: z.boolean().nullable(), q6_namedClients: z.boolean().nullable(), q7_inflows: z.enum(['UNDER_100K', '100K_TO_1M', 'OVER_1M']).nullable(), q8_auditedParent: z.boolean().nullable(), q9_physicalOffice: z.boolean().nullable(), q10_deckAndOrgChart: z.boolean().nullable(), q11_highRiskActivity: z.boolean().nullable(), q12_cashIntensive: z.boolean().nullable() }).nullable(),
  zone: z.enum(['ADGM', 'MAINLAND', 'KEZAD', 'MASDAR', 'TWOFOUR54']).nullable(), headcount: z.number().int().min(1).max(500).nullable(), events: z.array(z.enum(['bank_rejected', 'landlord_delayed', 'school_waitlisted'])).nullable(), rationale: z.string().max(300),
});
function normalize(wire: z.infer<typeof Wire>) {
  const clean = (record: Record<string, unknown>) => Object.fromEntries(Object.entries(record).filter(([, value]) => value !== null));
  return WhatIfResult.parse({ ...clean(wire), ...(wire.toggles ? { toggles: clean(wire.toggles) } : {}), ...(wire.bankable ? { bankable: clean(wire.bankable) } : {}) });
}
export default endpoint({ name: 'plan_edits', request: WhatIfRequest, result: WhatIfResult, wire: Wire, normalize, mock: req => mockWhatIf(req.question), instructions: 'Translate the question into edits relative to current. Only edit named toggles, bank answers, zone, headcount and events. Never propose durations. Null means untouched; do not repeat current values. Understand negation (do not enable a toggle when the user asks to disable it). Headcount must be 1 to 500. rationale under 300 characters. No edits are applied automatically.' });
