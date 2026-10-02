import { useEffect, useRef, useState } from 'react';
const STEPS = [
  ['go-live', 'A date for payroll', 'This is the date you can plan payroll around. It recomputes from every dependency.'],
  ['timeline', 'Follow the red path', 'Red is the critical path. The bank gates the chequebook, the chequebook gates every lease.'],
  ['bank-bar', 'Every step has a source', 'Select any step for its source and an explanation in English and Arabic.'],
  ['bankable', 'Make the bank file ready', 'Twelve questions set your rejection risk and review time.'],
  ['toggles', 'Change three decisions', 'Three decisions you can flip. Watch the date move.'],
  ['obligations', 'Find the hidden obligations', 'Tax and Emiratisation exposure appear in dirhams, with dates and sources.'],
  ['start-today', 'Start where it matters', 'What to start today, ranked by duration. The keystone names the step that unlocks the most work.'],
  ['what-if', 'Ask in plain words', 'The model proposes edits. You approve them. The engine does the dates.'],
];
export default function Tour({ onClose, onBank }: { onClose: () => void; onBank: (open: boolean) => void }) {
  const [step, setStep] = useState(0), [rect, setRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const card = useRef<HTMLDivElement>(null), close = useRef(onClose), bank = useRef(onBank);
  close.current = onClose; bank.current = onBank;
  useEffect(() => { const previous = document.activeElement as HTMLElement | null; card.current?.focus(); return () => previous?.focus(); }, []);
  useEffect(() => {
    bank.current(step === 3);
    const update = () => { const target = document.querySelector(`[data-tour="${STEPS[step][0]}"]`); if (target) { const r = target.getBoundingClientRect(); setRect({ x: Math.max(4, r.x - 4), y: Math.max(4, r.y - 4), width: Math.min(r.width + 8, window.innerWidth - 8), height: Math.min(r.height + 8, window.innerHeight - 200) }); } };
    const frame = requestAnimationFrame(() => { document.querySelector(`[data-tour="${STEPS[step][0]}"]`)?.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' }); update(); card.current?.focus(); });
    window.addEventListener('resize', update); window.addEventListener('scroll', update, true);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', update); window.removeEventListener('scroll', update, true); };
  }, [step]);
  function finish() { try { localStorage.setItem('landing-tour-seen', 'true'); } catch { /* Storage is optional. */ } bank.current(false); close.current(); }
  function next() { if (step === STEPS.length - 1) finish(); else setStep(s => s + 1); }
  return <div className="tour-layer"><div className="tour-spotlight" style={{ transform: `translate(${rect.x}px,${rect.y}px)`, width: rect.width, height: rect.height }} /><div className="tour-card" role="dialog" aria-modal="true" aria-labelledby="tour-title" tabIndex={-1} ref={card} onKeyDown={e => { if (e.key === 'Escape') finish(); if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') setStep(s => Math.max(0, s - 1)); if (e.key === 'Tab') { const buttons = Array.from(card.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? []), first = buttons[0], last = buttons[buttons.length - 1]; if (e.shiftKey && (document.activeElement === first || document.activeElement === card.current)) { e.preventDefault(); last?.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); } } }}><span className="mono-text">{step + 1} of {STEPS.length}</span><h2 id="tour-title">{STEPS[step][1]}</h2><p>{STEPS[step][2]}</p><div className="tour-actions"><button className="ls-text-button" onClick={finish}>Skip</button><button className="ls-btn secondary" disabled={step === 0} onClick={() => setStep(s => s - 1)}>Back</button><button className="ls-btn primary" onClick={next}>{step === STEPS.length - 1 ? 'Finish' : 'Next'}</button></div></div></div>;
}
