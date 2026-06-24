# Chat worker

A tiny Cloudflare Worker that powers the portfolio chatbot. It holds the Anthropic
API key (never exposed to the browser), injects Hamza's bio as the system prompt,
and proxies the chat to Claude. The site calls this worker; the key stays server-side.

## One-time setup

1. **Get an Anthropic API key** at <https://console.anthropic.com> (Billing -> add a
   little credit; a portfolio's traffic costs cents).
2. **Install + log in to Cloudflare** (free account):
   ```bash
   cd chat-worker
   npm install
   npx wrangler login
   ```
3. **Store the key as a secret** (not in any file):
   ```bash
   npx wrangler secret put ANTHROPIC_API_KEY
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
- Model is `claude-opus-4-8`. To cut cost ~5x, change `MODEL` to `claude-haiku-4-5`.
- History is capped to the last 10 turns and each message to 2000 chars to limit abuse.
  For heavier traffic, add Cloudflare rate limiting in front of the worker.
