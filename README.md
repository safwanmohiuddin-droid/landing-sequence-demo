# Landing Sequence

Landing Sequence models the critical path for moving a company and its people to Abu Dhabi: one dependency graph, a go-live date, twelve bank-readiness questions, obligations in dirhams and decisions that recompute the schedule. The pitch is `/`; the product is `/app`. This local continuation combines the already merged engine with the completed screen and AI layer. Team Visionary, Hub71+ AI Hackathon.

## Run locally

```sh
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

Open http://localhost:5173 for the pitch and http://localhost:5173/app for the product. No login or API key is required. Vite development mode uses validated, delayed local mocks for Explain, Draft and What-if, visibly labelled Demo mode after a call. Settings persist locally; plan edits reset on reload. Walkthrough offers eight steps; Play demo runs a deterministic 90-second sequence and supports Escape, Skip and Replay.

## Verify

```sh
npm test
npm run lint
npm run build
```

The 47 logic, schema and AI boundary tests cover the worked presets, cycles, retry events, obligations, HTTP guards, structured output parsing and fallback behavior. Browser verification includes desktop/mobile, reduced motion, the bank/toggle demo, walkthrough, autoplay, bilingual drafts, Arabic layout and Night theme. See [build log](docs/build-log.md).

## AI and architecture

Four server-side Vercel functions use the OpenAI Responses API: document extraction, bilingual explanation, paperwork drafting and what-if plan edits. Requests and results are validated with zod; `store: false`, a 25-second abort and mock fallback protect the demo. Only the server reads `OPENAI_API_KEY` and `OPENAI_MODEL`; configure both from `.env.example` when deploying later. What-if uses a strict nullable wire schema normalized to the unchanged public contract. The model proposes fields; the deterministic engine owns all durations and dates. Extraction fallback returns no facts or evidence instead of pretending to read documents; drafts use placeholders for unknown details. See [architecture and contracts](AGENTS.md) and [API smoke checks](api/__smoke__.md).

## Evidence and limits

Preset numbers are planning assumptions from the supplied data and cited published ranges, not guaranteed service times. The 2026 regulatory source strings remain supplied assumptions for the 2027 demo dates and require revalidation for real decisions. Survey sample/medians, Nova leasing measurements and school-call results were not provided; the pitch marks them pending. Core UI labels and the walkthrough support Arabic with a real RTL layout; sourced technical metadata and the supplied demo narration remain English. AI responses and letters present both languages.

Live URL: deferred. GitHub publication, merge, Vercel deployment, video recording and hackathon submission are deferred at the user's request. No live OpenAI call has been verified without server credentials.
