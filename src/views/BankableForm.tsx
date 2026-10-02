import { useUI } from './UiContext';
import { BANKABLE_QUESTIONS, BANK_DISCLAIMER } from '../data/banks';
import type { BankableAnswers, ScheduledPlan } from '../model/plan';
import type { DispatchPlan } from './types';
export default function BankableForm({ scheduled, dispatch }: { scheduled: ScheduledPlan; dispatch: DispatchPlan }) {
  const { t } = useUI();
  const bank = scheduled.nodes.bank_account;
  return <section data-tour="bankable" className="bankable-form"><h3>{t('A bank-ready company')}</h3><p className="bank-summary" aria-live="polite">{t('Rejection risk')} <strong>{Math.round((bank.pReject ?? 0) * 100)}%</strong> · {t('review')} <strong>{bank.medianDays} {t('days')}</strong> · {t(scheduled.structure)}</p><div className="question-grid">{BANKABLE_QUESTIONS.map((q, index) => <fieldset key={q.key}><legend><span className="mono-text">{String(index + 1).padStart(2, '0')}</span> {t(q.label)}</legend><div className="answer-options">{q.options.map(option => <button type="button" key={String(option.value)} aria-pressed={scheduled.bankable[q.key as keyof BankableAnswers] === option.value} onClick={() => dispatch({ type: 'setAnswer', key: q.key as keyof BankableAnswers, value: option.value as BankableAnswers[keyof BankableAnswers] })}>{t(option.label)}</button>)}</div></fieldset>)}</div><h4>{t('Document checklist')}</h4><ul className="bank-checklist">{scheduled.bankChecklist.map(item => <li key={item.item}><span aria-label={item.ready ? 'Ready' : 'Missing'}>{item.ready ? '✓' : '○'}</span>{item.item}</li>)}</ul><h4>{t('Bank fit')}</h4>{scheduled.bankFit.map(fit => <p key={fit}>{fit}</p>)}<small>{BANK_DISCLAIMER}</small></section>;
}
