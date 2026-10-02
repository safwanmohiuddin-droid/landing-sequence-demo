# API smoke checks

Use Vercel's local runtime for HTTP functions (`npx vercel dev --listen 5173`), or deploy later. Plain Vite serves the screen and pitch; its AI client falls back locally after an invalid/missing API response. No key is needed for the local visual demo.

PowerShell:

```powershell
Invoke-RestMethod http://localhost:5173/api/health
$body = @{ nodeId='bank_account'; label='Corporate bank account'; owner='bank'; startDay=35; finishDay=75.4; expectedDays=40.4; onCriticalPath=$true; unlocks=20; companyName='Northline Payments'; zone='ADGM'; source='Published range' } | ConvertTo-Json
Invoke-WebRequest http://localhost:5173/api/explain -Method Post -ContentType 'application/json' -Body $body
```

Expected: status 200, `x-ai-mode: mock` when configuration is absent, validated bilingual result. Invalid request → 400; GET → 405; request >4 MB → 413. `npm test` exercises all four handlers, method/body guards, live parsing, fallback, no fabricated evidence, placeholders, negation and strict what-if normalization.
