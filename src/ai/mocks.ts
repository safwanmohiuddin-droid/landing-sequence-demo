import type { ExtractResult, ExplainRequest, ExplainResult, DraftRequest, DraftResult, WhatIfResult } from './schemas';
export const mockExtract: ExtractResult = {
  company: { name: null, zone: null, activity: null, headcount: null, startDate: null, parentJurisdiction: null, ownershipLayers: null },
  people: [], evidence: [], confidence: 0,
};
export function mockExplain(req: ExplainRequest): ExplainResult {
  const days = req.expectedDays.toFixed(req.expectedDays % 1 ? 1 : 0);
  return {
    en: `${req.label} takes an expected ${days} days. ${req.onCriticalPath ? 'It is on your critical path, so a delay can move the operational date.' : `It runs in parallel and unlocks ${req.unlocks} later steps.`}`,
    ar: `تستغرق خطوة «${req.label}» ${days} يومًا حسب التقدير. ${req.onCriticalPath ? 'تقع على المسار الحرج، وقد يؤدي تأخيرها إلى تأخير موعد التشغيل.' : `تجري بالتوازي وتتيح بدء ${req.unlocks} خطوات لاحقة.`}`,
    actionToday: req.startDay === 0 ? `Start ${req.label.toLowerCase()} today.` : `Prepare the documents for ${req.label.toLowerCase()} before its dependencies finish.`,
  };
}
export function mockDraft(req: DraftRequest): DraftResult {
  const c = req.context;
  const value = (key: string) => c[key] ?? `[${key}]`;
  const company = value('companyName'), signatory = value('signatory');
  const greeting = req.tone === 'friendly' ? 'Hello,' : 'Dear Sir or Madam,';
  switch (req.template) {
    case 'bank_cover_letter': return {
      subject: `Account opening request: ${company}`,
      en: `${greeting}\n\n${company} requests a corporate account for its ${value('activity')} activity in ${value('zone')}. Our planned headcount is ${value('headcount')} and expected monthly inflows are ${value('inflows')}.\n\nPlease review the ownership structure and source-of-funds information in [supporting documents to attach]. Kindly confirm the remaining requirements and review timeline.\n\nKind regards,\n${signatory}`,
      ar: `السادة المحترمون،\n\nتطلب شركة ${company} فتح حساب للشركات لنشاط ${value('activity')} في ${value('zone')}. يبلغ عدد الموظفين المخطط ${value('headcount')}، والتدفقات الشهرية المتوقعة ${value('inflows')}.\n\nيرجى مراجعة هيكل الملكية ومعلومات مصدر الأموال في [المستندات الداعمة المطلوب إرفاقها]، وتأكيد المتطلبات المتبقية والمدة المتوقعة للمراجعة.\n\nمع التحية،\n${signatory}`,
    };
    case 'employer_rent_guarantee': return {
      subject: `Proposed rent guarantee for ${value('employeeName')}`,
      en: `${greeting}\n\n${company} proposes an employer rent guarantee for ${value('employeeName')}, employed as ${value('role')} with a basic monthly salary of AED ${value('salary')}.\n\nThe proposed annual rent is AED ${value('rent')} for ${value('address')}. Subject to [authorised approval and agreed guarantee terms], we propose bank transfer or direct debit instead of post-dated cheques. Please confirm acceptance and the terms required.\n\nSincerely,\n${signatory}`,
      ar: `السادة المحترمون،\n\nتقترح شركة ${company} ضمان إيجار للموظف ${value('employeeName')} الذي يعمل بوظيفة ${value('role')} وبراتب أساسي شهري قدره ${value('salary')} درهم.\n\nالإيجار السنوي المقترح هو ${value('rent')} درهم للعقار في ${value('address')}. رهنًا بـ[موافقة المفوّض وشروط الضمان المتفق عليها]، نقترح التحويل البنكي أو الخصم المباشر بدل الشيكات المؤجلة. يرجى تأكيد القبول والشروط المطلوبة.\n\nمع التقدير،\n${signatory}`,
    };
    case 'school_application': return {
      subject: `Admission enquiry: ${value('yearGroup')} for ${value('intake')}`,
      en: `${greeting}\n\nOur family is relocating to Abu Dhabi on ${value('arrival')} with ${company}. We would like to apply for a ${value('yearGroup')} place for ${value('intake')}. If the year group is full, please advise how to join the waiting list.\n\n[Attach the required reports and identity documents.]\n\nKind regards,\n${value('parentName')}`,
      ar: `السادة قسم القبول،\n\nتنتقل عائلتنا إلى أبوظبي بتاريخ ${value('arrival')} مع ${company}. نرغب في التقديم لمقعد في ${value('yearGroup')} لفترة ${value('intake')}. إذا كانت المرحلة مكتملة، يرجى توضيح كيفية الانضمام إلى قائمة الانتظار.\n\n[تُرفق التقارير ووثائق الهوية المطلوبة.]\n\nمع التحية،\n${value('parentName')}`,
    };
    case 'landlord_direct_debit': return {
      subject: `Tenancy at ${value('address')}: direct-debit proposal`,
      en: `${greeting}\n\nWe propose a tenancy at ${value('address')} for AED ${value('rent')} per year, paid through the UAE Direct Debit System in ${value('instalments')} instalments.\n\nPlease confirm whether you accept direct debit and [an employer guarantee, subject to approval] in place of post-dated cheques, and provide the terms required to sign and register Tawtheeq.\n\nKind regards,\n${value('tenantName')}`,
      ar: `السادة المحترمون،\n\nنقترح عقد إيجار للعقار في ${value('address')} بقيمة ${value('rent')} درهم سنويًا، تُدفع عبر نظام الخصم المباشر الإماراتي على ${value('instalments')} أقساط.\n\nيرجى تأكيد قبول الخصم المباشر و[ضمان جهة العمل، رهنًا بالموافقة] بدل الشيكات المؤجلة، وتوضيح شروط التوقيع وتسجيل توثيق.\n\nمع التحية،\n${value('tenantName')}`,
    };
  }
}
export function mockWhatIf(question: string): WhatIfResult {
  const q = question.toLowerCase(), result: WhatIfResult = { rationale: 'Demo mode: proposed edits from the named decisions. Review before applying.' };
  const enabled = !/\b(no|not|without|disable|off|stop|avoid)\b/.test(q);
  if (q.includes('kyc') || q.includes('bank') && q.includes('early')) result.toggles = { ...result.toggles, kycEarly: enabled };
  if (q.includes('cheque') || q.includes('direct debit')) result.toggles = { ...result.toggles, chequeFree: enabled };
  if (q.includes('flexi')) result.toggles = { ...result.toggles, flexiDesk: enabled };
  if (q.includes('mainland')) result.zone = 'MAINLAND';
  else if (q.includes('adgm')) result.zone = 'ADGM';
  else if (q.includes('kezad')) result.zone = 'KEZAD';
  else if (q.includes('masdar')) result.zone = 'MASDAR';
  else if (q.includes('twofour54')) result.zone = 'TWOFOUR54';
  if (q.includes('reject')) result.events = ['bank_rejected'];
  else if (q.includes('landlord') && q.includes('delay')) result.events = ['landlord_delayed'];
  else if (q.includes('school') && q.includes('waitlist')) result.events = ['school_waitlisted'];
  const match = q.match(/\b(\d{1,3})\s*(people|staff|employees)\b/);
  if (match && Number(match[1]) >= 1 && Number(match[1]) <= 500) result.headcount = Number(match[1]);
  return result;
}
