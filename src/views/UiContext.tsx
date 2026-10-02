import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
const AR: Record<string, string> = {
  'Landing Sequence':'مسار الوصول', 'Walkthrough':'جولة إرشادية','Play demo':'تشغيل العرض','Stop demo':'إيقاف العرض','Demo mode':'الوضع التجريبي','Jurisdiction':'المنطقة','People':'الموظفون','Start date':'تاريخ البدء','Your landing sequence':'مسار وصول شركتك','Go-live':'موعد التشغيل','weeks':'أسابيع','from start':'من تاريخ البدء','Start here':'ابدأ هنا','Start today':'ابدأ اليوم','What if we…':'ماذا لو…','Ask a what-if':'اطرح سيناريو بديلًا','Preview changes':'معاينة التغييرات','Apply proposed changes':'تطبيق التغييرات المقترحة','Thinking…':'جارٍ التفكير…','Keep the company standing.':'حافظ على جاهزية الشركة.','Corporate tax registration':'التسجيل للضريبة على الشركات','Emiratisation':'التوطين','Licence renewal':'تجديد الرخصة','Hidden obligation':'التزام غير ظاهر','Source':'المصدر','Source & assumptions':'المصدر والافتراضات','Three decisions. A different date.':'ثلاثة قرارات. موعد مختلف.','KYC, before the licence':'ملف البنك قبل الرخصة','A lease without cheques':'عقد إيجار بلا شيكات','Start from a flexi-desk':'ابدأ بمكتب مرن','Something went wrong':'طرأ تأخير','Clear':'مسح','A bank-ready company':'شركة جاهزة للبنك','Document checklist':'قائمة المستندات','Bank fit':'البنوك المناسبة','Depends on':'يعتمد على','Why this step matters':'أهمية هذه الخطوة','Explain in EN / AR':'شرح بالعربية والإنجليزية','Draft paperwork':'صياغة المستندات','Close ×':'إغلاق ×','Next':'التالي','Back':'السابق','Skip':'تخطي','Finish':'إنهاء','Replay':'إعادة العرض','Skip demo':'تخطي العرض','Close':'إغلاق','Take the walkthrough':'ابدأ الجولة','Dismiss':'إخفاء','Bank rejected us':'رفض البنك الطلب','Landlord delayed the lease':'تأخر المالك في العقد','School waitlisted':'قائمة انتظار المدرسة','Add a delay…':'أضف تأخيرًا…',
  'Company':'الشركة','Families':'العائلات','After go-live':'بعد التشغيل','Obligations':'الالتزامات','Critical path':'المسار الحرج','Parallel work':'العمل المتوازي','School':'المدرسة','Bank':'البنك','Office':'المكتب','Lease':'الإيجار',
  'Ownership layers between the company and its UBOs':'طبقات الملكية بين الشركة والمستفيدين الحقيقيين','Parent company jurisdiction':'بلد الشركة الأم','A signatory or UBO already holds UAE residence':'المفوّض بالتوقيع أو المستفيد الحقيقي مقيم في الإمارات','Licensed activity matches expected transactions':'النشاط المرخّص يطابق المعاملات المتوقعة','Source-of-funds pack ready (bank statements, audited accounts, cap table)':'ملف مصدر الأموال جاهز: كشوف البنك والحسابات المدققة وجدول الملكية','First clients named, contracts or LOIs in hand':'العملاء الأوائل معروفون والعقود أو خطابات النوايا جاهزة','Expected monthly inflows':'التدفقات الشهرية المتوقعة','Audited parent financials available':'الحسابات المدققة للشركة الأم متاحة','Office type':'نوع المكتب','Website, company deck and org chart ready':'الموقع وعرض الشركة ومخططها التنظيمي جاهزة','Activity in a high-risk category (crypto, precious metals, general trading, real estate brokerage, defence)':'نشاط عالي المخاطر: العملات الرقمية أو المعادن الثمينة أو التجارة العامة أو الوساطة العقارية أو الدفاع','Cash-intensive business':'نشاط يعتمد على النقد','Yes':'نعم','No':'لا','Physical office':'مكتب فعلي','Flexi-desk':'مكتب مرن','Low-risk':'مخاطر منخفضة','High-risk or grey-listed':'مخاطر مرتفعة أو قائمة رمادية','3 or more':'٣ أو أكثر',
  'Corporate bank account':'حساب الشركة البنكي','Parent company documents attested':'تصديق مستندات الشركة الأم','Bank KYC pack prepared':'إعداد ملف اعرف عميلك','Office lease sized for visa quota':'عقد مكتب مناسب لحصة التأشيرات','Establishment card and immigration file':'بطاقة المنشأة وملف الهجرة','Chequebook issued':'إصدار دفتر الشيكات','Degree attestation':'تصديق الشهادة','Work permit and entry visa':'تصريح العمل وتأشيرة الدخول','Medical and Emirates ID':'الفحص الطبي والهوية الإماراتية','Residential lease and Tawtheeq':'عقد السكن وتوثيق','Register for corporate tax':'التسجيل للضريبة على الشركات',
};
Object.assign(AR, {
  "ABU DHABI / OPERATIONS PLAN": "أبوظبي / خطة التشغيل",
  "YOUR OPERATIONAL DATE": "موعد تشغيل شركتك",
  "START HERE": "ابدأ هنا",
  "ONE COMPANY. EVERY PERSON.": "شركة واحدة. كل موظف.",
  "CHANGE THE CONNECTIONS": "غيّر الاعتماد بين الخطوات",
  "AFTER THE ARRIVAL": "بعد الوصول",
  "ON YOUR CALENDAR": "في تقويمك",
  "EXPLORE ANOTHER ROUTE": "استكشف مسارًا بديلًا",
  "DON’T WAIT FOR EVERYTHING": "لا تنتظر اكتمال كل شيء",
  "Explain this step": "اشرح هذه الخطوة",
  "The model proposes. You decide. The engine schedules.": "النموذج يقترح. أنت تقرر. والمحرك يحسب المواعيد.",
  "Select a step for its source, dependencies and next action. Scroll across the timeline for annual deadlines.": "اختر خطوة للاطلاع على مصدرها وما تعتمد عليه والإجراء التالي. مرّر الجدول لرؤية المواعيد السنوية.",
  "Solid bars show review time. Dashed extensions show expected retry time.": "الأشرطة المتصلة تبيّن مدة المراجعة. والامتدادات المتقطعة تبيّن وقت إعادة المحاولة المتوقع.",
  "Prepare the bank KYC pack before the licence issues.": "جهّز ملف البنك قبل إصدار الرخصة.",
  "Landlord accepts direct debit or an employer guarantee.": "يقبل المالك الخصم المباشر أو ضمان جهة العمل.",
  "Flexi-desk counts as the registered office for the visa file.": "يُعتمد المكتب المرن مكتبًا مسجلًا لملف التأشيرات.",
  "Emiratisation does not apply in free zones": "لا ينطبق التوطين في المناطق الحرة",
  "Emiratisation does not apply below 20 staff": "لا ينطبق التوطين على الشركات دون ٢٠ موظفًا",
  "The next year starts before this one ends.": "خطّط للعام المقبل قبل انتهاء هذا العام.",
  "A date for payroll": "موعد لتخطيط الرواتب",
  "Follow the red path": "اتبع المسار الحرج",
  "Every step has a source": "لكل خطوة مصدر",
  "Make the bank file ready": "جهّز ملف البنك",
  "Change three decisions": "غيّر ثلاثة قرارات",
  "Find the hidden obligations": "اكتشف الالتزامات غير الظاهرة",
  "Start where it matters": "ابدأ بما يفتح الطريق",
  "Ask in plain words": "اسأل بكلمات بسيطة",
  "This is the date you can plan payroll around. It recomputes from every dependency.": "هذا موعد يمكنك التخطيط للرواتب بناءً عليه. يُحسب من جديد عند تغيير أي اعتماد.",
  "Red is the critical path. The bank gates the chequebook, the chequebook gates every lease.": "الأحمر هو المسار الحرج. الحساب البنكي شرط لدفتر الشيكات، ودفتر الشيكات شرط لكل عقد إيجار.",
  "Select any step for its source and an explanation in English and Arabic.": "اختر أي خطوة لعرض مصدرها وشرحها بالإنجليزية والعربية.",
  "Twelve questions set your rejection risk and review time.": "اثنا عشر سؤالًا تحدد احتمال رفض البنك ومدة المراجعة.",
  "Three decisions you can flip. Watch the date move.": "يمكنك تغيير ثلاثة قرارات. راقب تغيّر الموعد.",
  "Tax and Emiratisation exposure appear in dirhams, with dates and sources.": "تظهر تبعات الضريبة والتوطين بالدرهم مع المواعيد والمصادر.",
  "What to start today, ranked by duration. The keystone names the step that unlocks the most work.": "ابدأ اليوم بالخطوات المرتبة حسب المدة. تحدد خطوة البداية ما يتيح أكبر عدد من الخطوات اللاحقة.",
  "The model proposes edits. You approve them. The engine does the dates.": "النموذج يقترح التغييرات. أنت توافق عليها. والمحرك يحسب المواعيد.",
  "gov": "الجهة الحكومية",
  "federal": "الجهة الاتحادية",
  "bank": "البنك",
  "landlord": "المالك",
  "school": "المدرسة",
  "company": "الشركة"
});
Object.assign(AR, {
  "A guided look at the date, the dependencies and the decisions.": "جولة في الموعد والخطوات والقرارات المؤثرة.",
  "Critical path": "المسار الحرج",
  "Parallel work": "العمل المتوازي",
  "weeks": "أسابيع",
  "from start": "من تاريخ البدء",
  "days": "أيام",
  "days left on the table": "يومًا يمكن توفيرها",
  "MODELLED, NOT GUARANTEED": "تقدير تخطيطي، غير مضمون",
  "Your best modelled route": "أفضل مسار حسب النموذج",
  "Thinking…": "جارٍ التفكير…",
  "Rejection risk": "احتمال الرفض",
  "review": "المراجعة",
  "simple": "بسيط",
  "international": "دولي",
  "complex": "معقّد",
  "Use direct debit and prepare KYC early": "استخدم الخصم المباشر وجهّز ملف البنك مبكرًا",
  "penalty if late": "غرامة عند التأخر",
  "exposure": "التبعات المالية",
  "of": "من"
});
function translate(text:string, language:'en'|'ar') { if(language==='en')return text;if(AR[text])return AR[text];if(text.startsWith('School seat ('))return text.replace('School seat','مقعد دراسي');if(text.startsWith('Trade licence ('))return text.replace('Trade licence','الرخصة التجارية');return text; }
const Context=createContext({language:'en' as 'en'|'ar',theme:'marble' as 'marble'|'night',toggleLanguage:()=>{},toggleTheme:()=>{},t:(text:string)=>text});
export function UiProvider({children}:{children:ReactNode}) {
  const [language,setLanguage]=useState<'en'|'ar'>(()=>{try{return localStorage.getItem('landing-language')==='ar'?'ar':'en';}catch{return 'en';}});
  const [theme,setTheme]=useState<'marble'|'night'>(()=>{try{return localStorage.getItem('landing-theme')==='night'?'night':'marble';}catch{return 'marble';}});
  useEffect(()=>{document.documentElement.dir=language==='ar'?'rtl':'ltr';document.documentElement.lang=language;document.documentElement.dataset.theme=theme;try{localStorage.setItem('landing-language',language);localStorage.setItem('landing-theme',theme);}catch{/* Optional. */}},[language,theme]);
  return <Context.Provider value={{language,theme,toggleLanguage:()=>setLanguage(l=>l==='en'?'ar':'en'),toggleTheme:()=>setTheme(t=>t==='marble'?'night':'marble'),t:text=>translate(text,language)}}>{children}</Context.Provider>;
}
export const useUI=()=>useContext(Context);
