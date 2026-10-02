import type { BankableAnswers, Plan, StuckEvent, Toggles, Zone } from '../model/plan';
import type { WhatIfResult } from '../ai/schemas';
export type PlanAction =
  | { type: 'setPreset'; preset: 'A'|'B' }
  | { type: 'setZone'; zone: Zone }
  | { type: 'setHeadcount'; headcount: number }
  | { type: 'setStartDate'; startDate: string }
  | { type: 'setToggle'; key: keyof Toggles; value: boolean }
  | { type: 'setAnswer'; key: keyof BankableAnswers; value: BankableAnswers[keyof BankableAnswers] }
  | { type: 'addEvent'; event: StuckEvent }
  | { type: 'clearEvents' }
  | { type: 'applyWhatIf'; result: WhatIfResult };
export type DispatchPlan = (action: PlanAction) => void;
export type { Plan };
