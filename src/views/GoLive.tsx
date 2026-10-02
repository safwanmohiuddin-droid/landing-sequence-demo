import { useEffect, useState } from 'react';
import { animate, useReducedMotion } from 'motion/react';
import { addDays, type ScheduledPlan } from '../model/plan';
import { useUI } from './UiContext';
export default function GoLive({scheduled}:{scheduled:ScheduledPlan}) {
  const {t,language}=useUI();
  const [day,setDay]=useState(scheduled.goLiveDay);
  const reduced=useReducedMotion();
  useEffect(()=>{
    if(reduced){setDay(scheduled.goLiveDay);return;}
    const controls=animate(day,scheduled.goLiveDay,{duration:.3,ease:[.22,1,.36,1],onUpdate:setDay});
    return()=>controls.stop();
  },[scheduled.goLiveDay,reduced]);
  const lost=Math.max(0,scheduled.goLiveDay-scheduled.idealGoLiveDay);
  const date=language==='ar'?new Intl.DateTimeFormat('ar-AE',{weekday:'short',day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(addDays(scheduled.company.startDate,scheduled.goLiveDay)):scheduled.goLiveDate;
  return <section className="go-live panel" data-tour="go-live"><span className="eyebrow">{t('YOUR OPERATIONAL DATE')}</span><h2>{t('Go-live')}</h2><strong className="go-live-date" aria-live="polite">{date}</strong><div className="week-display"><span className="tnum">{(day/7).toFixed(1)}</span><span>{t('weeks')}<br/>{t('from start')}</span></div><div className="go-live-foot">{lost>0?<span className="crit-text"><strong>{lost.toFixed(1)}</strong> {t('days left on the table')}</span>:<span className="accent-text">{t('Your best modelled route')}</span>}<span>{t('MODELLED, NOT GUARANTEED')}</span></div></section>;
}
