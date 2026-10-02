# AI and pitch continuation

Implemented extract, explain, draft, what-if and health as Vercel Node functions. Method, JSON, 4 MB limit, request and result schema validation, 25-second cancellation, no storage and deterministic delayed fallbacks are covered. Both API key and model are server environment variables. The client reads x-ai-mode and validates fallback output, with timer cleanup.

The frozen what-if result has optional fields and an open record that is unsuitable for strict Structured Outputs. A separate typed nullable wire schema normalizes into that public contract; no frozen files were changed. Invalid answer values are also ignored by the screen reducer.

Demo extraction returns no facts, no evidence and confidence zero instead of claiming to have read the user's files. Missing draft details remain bracketed placeholders. Survey, Nova and school-call measurements are explicitly pending. Supplied 2026 regulatory assumptions are preserved and described as model assumptions, not re-certified for 2027 preset dates.

Pitch keeps the supplied narrative, with correction of unsupported fieldwork claims. Added count-up hero, loop drawing, sticky checklist-to-graph, comparative schedule, scroll progress, restrained reveals, Enter shortcut and reduced-motion final states. Warm marble, Gulf blue and Instrument Serif/Geist match the user's house rules. No dependencies added.

Live OpenAI calls have not been exercised: no configured key in this repository. Endpoint tests exercise the SDK boundary with mocked outputs and real request/result schemas.

Contract change requests: none.
