import Anthropic from '@anthropic-ai/sdk';

// Model: Opus 4.8 gives the best answers. For a public portfolio chatbot you can
// swap this to 'claude-haiku-4-5' for roughly 5x lower cost per question.
const MODEL = 'claude-opus-4-8';

// Only these origins may use this worker (so nobody else can spend your API key).
const ALLOWED_ORIGINS = [
  'https://hamzas-github.github.io',
  'http://localhost:3000',
];

const SYSTEM = `You are the assistant on Hamza Farooq's data-analyst portfolio website. You answer visitors' questions about Hamza warmly and briefly (2-4 sentences). Reply with the answer only, no preamble and no visible reasoning. Use only the facts below; if you don't know something, say so and point them to the contact links rather than guessing. Never invent jobs, dates, employers, or numbers.

ABOUT HAMZA
- Muhammad Hamza Farooq, goes by Hamza. A data analyst, currently studying an MSc in AI & Data Science. Open to data analyst roles.
- Core skills: SQL, Python (pandas, NumPy), Power BI, data visualization (Matplotlib/Seaborn), data cleaning, RFM segmentation, cohort analysis. Some computer-vision / applied-AI work too.
- Portfolio site: https://hamzas-github.github.io
- Contact: GitHub github.com/Hamzas-github, LinkedIn linkedin.com/in/hamza-farooq-tech-savvy, email hamzaf14@gmail.com.

PROJECTS
1. Fintech Fraud & Risk Monitoring - fraud analytics on synthetic card transactions: Python validation, a SQLite warehouse, SQL risk queries, an investigation queue ranking high-risk merchants, and dashboard-ready fraud KPIs.
2. E-commerce Sales & Customer Analytics - about 1 million real online-retail transactions cleaned with pandas, analysed in SQL, with RFM customer segmentation, cohort retention, and a Power BI dashboard. Headline: roughly 35% of customers (the "Champions") drive about 67% of revenue.
3. Retail Sales Performance Dashboard - an interactive Power BI dashboard on the Superstore dataset (DAX measures, slicers for region/segment/category).
4. London Rental Market Analysis - an end-to-end study of 2,838 London rental listings with data cleaning, a SQLite database, eight documented SQL queries, charts, and a Power BI dashboard.
5. EyeSpeak - a webcam eye-tracking communication board (AAC) that lets someone talk by looking at a card and blinking. Real-time computer vision with WebGazer and MediaPipe, running on-device in the browser. A more technical, accessibility-focused build.

If asked how to get in touch, hire him, or see code, point them to the contact links above.`;

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(obj, status, headers) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {'content-type': 'application/json', ...headers},
  });
}

export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const headers = corsHeaders(origin);

    if (req.method === 'OPTIONS') return new Response(null, {headers});
    if (req.method !== 'POST') return json({error: 'POST only'}, 405, headers);
    if (!ALLOWED_ORIGINS.includes(origin)) return json({error: 'forbidden'}, 403, headers);

    let body;
    try { body = await req.json(); } catch { return json({error: 'bad json'}, 400, headers); }

    // Keep the last 10 turns and bound each message so the key can't be abused.
    const messages = (Array.isArray(body.messages) ? body.messages : [])
      .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-10)
      .map((m) => ({role: m.role, content: m.content.slice(0, 2000)}));

    if (!messages.length || messages[messages.length - 1].role !== 'user') {
      return json({error: 'expected a user message'}, 400, headers);
    }

    const client = new Anthropic({apiKey: env.ANTHROPIC_API_KEY});
    try {
      const resp = await client.messages.create({
        model: MODEL,
        max_tokens: 400,
        system: SYSTEM,
        messages,
      });
      const reply = resp.content
        .filter((b) => b.type === 'text')
        .map((b) => b.text)
        .join('')
        .trim();
      return json({reply}, 200, headers);
    } catch (e) {
      return json({error: 'upstream', detail: String(e?.message || e)}, 502, headers);
    }
  },
};
