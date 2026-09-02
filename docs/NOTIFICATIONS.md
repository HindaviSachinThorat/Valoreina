Notification setup and testing

Overview

This project can silently forward incoming inquiries to:
- Email (via SMTP)
- WhatsApp (via the WhatsApp Cloud API)

Both are optional — if credentials are not provided the server will skip the corresponding step.

Environment variables

Copy `.env.example` to `.env.local` (or set variables in your hosting environment) and fill values:

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`, `EMAIL_TO`
- `WHATSAPP_PHONE_ID`, `WHATSAPP_TOKEN`, `WHATSAPP_TO`

Local testing (development)

1. Create `.env.local` in the repo root and populate credentials. For Windows PowerShell:

```powershell
# copy example
Copy-Item .\.env.example .\.env.local
notepad .\.env.local
```

2. Restart the dev server so server runtime picks up the env vars.

```powershell
# stop dev server and start again
npm run dev
```

3. Open the site at `http://localhost:8080`, go to Contact → fill and submit the inquiry form.

4. Check server logs (terminal running `npm run dev`) — the `submitInquiry` function logs steps and will emit messages like:

- `[submitInquiry] received payload:`
- `[submitInquiry] notification email sent to ...` (if SMTP configured)
- `[submitInquiry] WhatsApp notification sent` (if WhatsApp configured)

Troubleshooting

- If you see `SMTP not configured` or `WhatsApp not configured` messages, verify env var names and that you restarted the server.
- For WhatsApp Cloud API errors, inspect the response body in server logs — it will contain the API error.

Security

- Keep `.env.local` out of version control. Add it to `.gitignore` if not already ignored.

Questions

If you want, I can try a test send using your credentials (you can paste them here temporarily), or I can guide you through registering a WhatsApp Cloud API test app.
