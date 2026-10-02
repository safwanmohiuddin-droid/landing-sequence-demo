import type { PlanAction } from './types';
export type DemoStep = { at: number; caption: string; action?: PlanAction; node?: string | null; explain?: boolean; target?: string };
export const DEMO_STEPS: DemoStep[] = [
  { at: 0, caption: 'One company. Twelve people. One operational date.', action: { type: 'setPreset', preset: 'A' }, node: null, target: 'go-live' },
  { at: 7000, caption: 'Red is the critical path. The bank gates every lease.', target: 'timeline' },
  { at: 14000, caption: 'Twelve questions make the bank review visible.', node: 'bank_account' },
  { at: 23000, caption: 'Source of funds ready. Rejection risk falls.', action: { type: 'setAnswer', key: 'q5_sourceOfFundsPack', value: true } },
  { at: 29000, caption: 'Named clients. A clearer route through review.', action: { type: 'setAnswer', key: 'q6_namedClients', value: true } },
  { at: 35000, caption: 'Deck and ownership chart ready. Risk 12%. Review 23 days.', action: { type: 'setAnswer', key: 'q10_deckAndOrgChart', value: true } },
  { at: 42000, caption: 'Now change the connections.', node: null, target: 'toggles' },
  { at: 45000, caption: 'Direct-debit rent removes the chequebook dependency.', action: { type: 'setToggle', key: 'chequeFree', value: true } },
  { at: 46500, caption: 'Prepare KYC while the licence is processing.', action: { type: 'setToggle', key: 'kycEarly', value: true } },
  { at: 48000, caption: 'Flexi-desk opens the visa file sooner. Week 7.8.', action: { type: 'setToggle', key: 'flexiDesk', value: true }, target: 'go-live' },
  { at: 57000, caption: 'The model explains in English and Arabic. The engine owns the dates.', node: 'bank_account', explain: true },
  { at: 70000, caption: 'Sixty staff on the mainland. A different set of obligations.', action: { type: 'setPreset', preset: 'B' }, node: null, target: 'obligations' },
  { at: 77000, caption: 'Five Emirati hires. AED 45,000 per month of modelled exposure.', target: 'obligations' },
  { at: 90000, caption: 'Week 13 to week 8. Every plan reports real durations.', node: null, target: 'go-live' },
];
