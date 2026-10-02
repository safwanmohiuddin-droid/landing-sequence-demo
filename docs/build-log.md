# Local integration build log

## 2026-10-02 — Engine, screen and AI/pitch integration

Continued the existing repository rather than the unrelated parent project. Integrated remote main's completed engine with the screen continuation and AI/pitch branches on `codex/local-integration`. Preserved frozen model/schema contracts and dependencies. Publication is deferred for local inspection.

Built the responsive schedule, bank-readiness form, decision controls, obligations, step drawer, first-use eight-step tour and deterministic 90-second autoplay. Added server-side validated Responses endpoints and realistic delayed fallbacks, plus the editorial pitch and sticky dependency discovery. Local Vite development uses mocks directly; no key is required. No secret files were copied or committed.

Fixed interaction defects found in browser checks: blur shrinking the timeline inspector underneath a switch; transform origin for schedule bars; modal drawers blocking guided controls; Arabic timeline opening at its far end; untranslated primary Arabic actions; premature client timeout clearing; and a Motion scroll-container warning. Stable inspector geometry, correct transform origins, non-modal guided drawers and an LTR engineering axis inside the mirrored interface address these defects.

Verification: `npm test` (47 passing), `npm run lint`, and `npm run build` pass. Playwright exercised bank fixes and all decisions (13.2 to 7.8 weeks), explanation, bilingual placeholder drafts, what-if preview/apply, all tour steps, autoplay completion/replay and Escape. Viewports: 1440×900, 390×844, 768, 1280×720 and a layout-equivalent 150% zoom width. Fresh desktop/phone contexts report zero console errors/warnings and no horizontal page overflow. Reduced-motion checks include the tour and pitch discovery at 0/25/50/75/100% progress. Independent visual and API boundary reviews cleared their scored defects.

Evidence in `docs/screenshots/`: `pitch-1440-review.png`, `pitch-390-review.png`, `screen-1440-review.png`, `screen-390-review.png`, `screen-rtl-night-1440-review.png`, `screen-rtl-night-390-review.png`, and `pinned-{1440|390}-{no-preference|reduce}-{0|25|50|75|100}-review.png`. Replaced captures contaminated by the autoplay clock/viewport with fresh browser contexts.

Limits: the Impeccable launcher/detector binary was unavailable; the requested `npx --no-install impeccable detect src/` failed due unavailable package/cache access. Manual skill checks and independent screenshot review completed instead. Live OpenAI behavior remains unverified without server credentials. Source metadata, timeline labels and scripted narration retain English. Field survey, leasing medians and school-call results were not supplied and are explicitly pending. Deployment, remote merge/push, recording and submission remain deferred.
