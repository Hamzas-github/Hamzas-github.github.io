# Chat worker

A tiny Cloudflare Worker that powers the portfolio chatbot. It holds the Groq
API key (never exposed to the browser), injects Hamza's bio as the system prompt,
and proxies the chat to a free Groq model. The site calls this worker; the key
stays server-side.

## One-time setup

1. **Get a free Groq API key** at <https://console.groq.com> (no credit card; free tier).
2. **Install + log in to Cloudflare** (free account):
   ```bash
   cd chat-worker
   npm install
   npx wrangler login
   ```
3. **Store the key as a secret** (not in any file):
   ```bash
   npx wrangler secret put GROQ_API_KEY
   # paste the key when prompted
   ```
4. **Deploy**:
   ```bash
   npm run deploy
   ```
   Wrangler prints a URL like `https://hamza-chat-worker.<you>.workers.dev`.
5. **Point the site at it**: set `chatEndpoint` in `docusaurus.config.js` to that URL,
   then commit and push. The chat widget appears once `chatEndpoint` is set.

## Notes

- Allowed origins are pinned in `src/worker.js` (`ALLOWED_ORIGINS`) so only your site
  can use the worker. Add a domain there if you ever move the site.
- Model is `llama-3.3-70b-versatile` (free on Groq). Swap `MODEL` in `src/worker.js`
  for any model Groq lists (e.g. `llama-3.1-8b-instant` for lighter, faster replies).
- History is capped to the last 10 turns and each message to 2000 chars to limit abuse.
  For heavier traffic, add Cloudflare rate limiting in front of the worker.
