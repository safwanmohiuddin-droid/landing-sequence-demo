import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { pipeline } from './engine/pipeline';
import { PRESETS, PRESET_A } from './data/presets';
import { BANKABLE_QUESTIONS } from './data/banks';
import type { Plan } from './model/plan';
import type { PlanAction } from './views/types';
import TopBar from './views/TopBar';
import Timeline from './views/Timeline';
import GoLive from './views/GoLive';
import Keystone from './views/Keystone';
import StartToday from './views/StartToday';
import Toggles from './views/Toggles';
import ObligationCards from './views/ObligationCards';
import WhatIf from './views/WhatIf';
import NodeDrawer from './views/NodeDrawer';
import Tour from './views/Tour';
import { UiProvider, useUI } from './views/UiContext';
import { DEMO_STEPS } from './views/Autoplay';
function resizePeople(plan: Plan, headcount: number): Plan {
  const count = Math.max(1, Math.min(500, Math.round(headcount)));
  const people = Array.from({ length: count }, (_, i) => plan.people[i] ?? { id: `added-${i + 1}`, name: `Employee ${i + 1}`, role: 'Staff', skilled: true, basicSalaryAED: 15000 });
  return { ...plan, people, company: { ...plan.company, headcount: count, skilledHeadcount: Math.min(count, Math.round(count * plan.company.skilledHeadcount / plan.company.headcount)) } };
}
function reducer(plan: Plan, action: PlanAction): Plan {
  switch (action.type) {
    case 'setPreset': return structuredClone(PRESETS[action.preset]);
    case 'setZone': return { ...plan, company: { ...plan.company, zone: action.zone } };
    case 'setHeadcount': return resizePeople(plan, action.headcount);
    case 'setStartDate': return { ...plan, company: { ...plan.company, startDate: action.startDate } };
    case 'setToggle': return { ...plan, toggles: { ...plan.toggles, [action.key]: action.value } };
    case 'setAnswer': return { ...plan, bankable: { ...plan.bankable, [action.key]: action.value } };
    case 'addEvent': return { ...plan, events: [...new Set([...(plan.events ?? []), action.event])] };
    case 'clearEvents': return { ...plan, events: [] };
    case 'applyWhatIf': {
      const r = action.result, bankable = { ...plan.bankable };
      for (const q of BANKABLE_QUESTIONS) if (q.options.some(o => o.value === r.bankable?.[q.key])) Object.assign(bankable, { [q.key]: r.bankable?.[q.key] });
      const next = { ...plan, bankable, toggles: { ...plan.toggles, ...r.toggles }, company: { ...plan.company, ...(r.zone ? { zone: r.zone } : {}) }, events: [...new Set([...(plan.events ?? []), ...(r.events ?? [])])] };
      return r.headcount !== undefined && r.headcount > 0 ? resizePeople(next, r.headcount) : next;
    }
  }
}

function WorkspaceApp() {
  const { t } = useUI();
  const [plan, baseDispatch] = useReducer(reducer, PRESET_A), [preset, setPreset] = useState<'A' | 'B'>('A');
  const scheduled = useMemo(() => pipeline(plan), [plan]);
  const [node, setNode] = useState<string | null>(null), [autoExplain, setAutoExplain] = useState(false), [tour, setTour] = useState(false), [offerTour, setOfferTour] = useState(false), [demo, setDemo] = useState(false), [playing, setPlaying] = useState(false), [caption, setCaption] = useState(''), [ended, setEnded] = useState(false);
  const demoClock = useRef({ elapsed: 0, index: 0, last: 0 });
  function dispatch(action: PlanAction) { if (action.type === 'setPreset') { setPreset(action.preset); setNode(null); } baseDispatch(action); }
  function select(id: string, explain = false) { setAutoExplain(explain); setNode(id); }
  useEffect(() => { try { setOfferTour(!localStorage.getItem('landing-tour-seen')); } catch { setOfferTour(true); } }, []);
  useEffect(() => {
    if (!playing) return;
    demoClock.current = { elapsed: 0, index: 0, last: performance.now() };
    const timer = window.setInterval(() => {
      const now = performance.now(), c = demoClock.current;
      if (!document.hidden && document.hasFocus()) c.elapsed += now - c.last;
      c.last = now;
      while (c.index < DEMO_STEPS.length && c.elapsed >= DEMO_STEPS[c.index].at) {
        const step = DEMO_STEPS[c.index++]; if (step.action) dispatch(step.action); if (step.node !== undefined) { setNode(step.node); setAutoExplain(!!step.explain); } setCaption(step.caption);
        if (step.target) requestAnimationFrame(() => document.querySelector(`[data-tour="${step.target}"]`)?.scrollIntoView({ block: 'center', behavior: 'instant' }));
      }
      if (c.index === DEMO_STEPS.length) { setPlaying(false); setEnded(true); }
    }, 100);
    const escape = (e: KeyboardEvent) => { if (e.key === 'Escape') { setPlaying(false); setCaption(''); setNode(null); } };
    window.addEventListener('keydown', escape); return () => { clearInterval(timer); window.removeEventListener('keydown', escape); };
  }, [playing]);
  function play() { setTour(false); setOfferTour(false); setEnded(false); setCaption(''); setPlaying(p => !p); setNode(null); }
  return <div className="landing-app"><TopBar plan={plan} preset={preset} dispatch={dispatch} onTour={() => { setOfferTour(false); setTour(true); }} onPlay={play} playing={playing} demo={demo} />{offerTour && !playing && <div className="tour-offer"><span>{t("A guided look at the date, the dependencies and the decisions.")}</span><button className="ls-text-button" onClick={() => { setOfferTour(false); setTour(true); }}>{t("Take the walkthrough")}</button><button className="ls-text-button" onClick={() => { setOfferTour(false); try { localStorage.setItem('landing-tour-seen', 'true'); } catch { /* Optional. */ } }}>{t("Dismiss")}</button></div>}<main className="workspace"><div className="workspace-main"><Timeline scheduled={scheduled} onSelect={select} /><Toggles plan={plan} dispatch={dispatch} /><ObligationCards scheduled={scheduled} /></div><aside className="workspace-aside"><GoLive scheduled={scheduled} /><Keystone scheduled={scheduled} onExplain={id => select(id, true)} /><WhatIf plan={plan} dispatch={dispatch} onAiMode={mode => setDemo(mode === 'mock')} /><StartToday scheduled={scheduled} onSelect={select} /></aside></main><footer className="app-footer">Team Visionary · Planning estimates, sourced on every step. Family settlement may extend beyond company go-live.</footer>{node && scheduled.nodes[node] && <NodeDrawer key={node} id={node} scheduled={scheduled} dispatch={dispatch} onClose={() => setNode(null)} onSelect={select} onAiMode={mode => setDemo(mode === 'mock')} autoExplain={autoExplain} passive={tour || playing} />}{tour && <Tour onClose={() => setTour(false)} onBank={open => { if (open) select('bank_account'); else setNode(null); }} />}{(playing || ended) && <div className="demo-caption" role="status"><span>{caption}</span><button className="ls-btn secondary" onClick={ended ? play : () => { setPlaying(false); setCaption(''); setNode(null); }}>{ended ? 'Replay' : 'Skip demo'}</button>{ended && <button className="ls-text-button" onClick={() => setEnded(false)}>Close</button>}</div>}</div>;
}


export default function App() { return <UiProvider><WorkspaceApp /></UiProvider>; }

