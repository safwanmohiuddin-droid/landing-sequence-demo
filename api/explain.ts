import { endpoint } from './_lib.js';
import { ExplainRequest, ExplainResult } from '../src/ai/schemas.js';
import { mockExplain } from '../src/ai/mocks.js';
export default endpoint({ name: 'explanation', request: ExplainRequest, result: ExplainResult, mock: mockExplain, instructions: 'Explain this relocation step in exactly two sentences in English and a faithful Modern Standard Arabic translation. Mention the provided expected days and whether it is on the critical path. Never invent durations or promises. actionToday is one imperative sentence, respecting the startDay and dependencies. English and Arabic each under 400 characters; actionToday under 160.' });
