---
id: ai-chatbot
title: AI Portfolio Chatbot
sidebar_label: AI Portfolio Chatbot
description: A floating chat on my portfolio that answers questions about me in the first person and reads each answer aloud in a clone of my own voice.
keywords: [AI chatbot, LLM, Cloudflare Workers, Groq, ElevenLabs, voice clone, liquid glass, JavaScript, RAG]
---

# AI Portfolio Chatbot

> The chat bubble in the corner of this site. Ask it anything about me, my projects, my
> skills, even whether I need visa sponsorship, and it answers in the first person and
> reads the reply aloud in a clone of my own voice.

[![Code on GitHub](https://img.shields.io/badge/Code-GitHub-181717?logo=github)](https://github.com/Hamzas-github/ai-portfolio-chatbot)
&nbsp;
![JavaScript](https://img.shields.io/badge/Vanilla-JS-F7DF1E?logo=javascript&logoColor=black)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white)

![AI Portfolio Chatbot](/img/projects/ai-chatbot/cover.svg)

## Why I built it

Most people skim a portfolio for ten seconds and leave with questions they never ask. I
wanted them to just ask. So I built a little chat that knows my background and answers as
me, briefly and honestly, and points to my real contact links instead of guessing when it
does not know something.

It was also a chance to do a different kind of build from my analytics work: a real
front-to-back feature with a server side, third-party APIs, and a UI I actually cared
about.

## What it does

- **Answers in the first person.** "I built six projects", not "Hamza built". It only uses
  a fixed set of facts about me and admits when it does not know rather than inventing
  jobs, dates, or numbers.
- **Reads answers aloud in my voice.** Each reply can play back in a clone of my own voice.
  Spoken links are simplified, so it says "my LinkedIn" instead of reading the raw URL.
- **Handles the awkward questions.** Salary, "are you a real person", off-topic or hostile
  prompts: it stays calm, honest, and steers back to my work.
- **iOS-style liquid glass.** The panel refracts the page behind it with an SVG
  displacement filter, with a frosted-blur fallback where that is not supported.

## How it works

A static site cannot hold an API key without leaking it, so the browser never talks to the
AI directly. It calls a small Cloudflare Worker that holds the keys server-side and does
two jobs:

```
browser widget  ->  Cloudflare Worker  ->  Groq          (chat)
                                       ->  ElevenLabs     (voice)
```

- **The widget** is one plain JavaScript file. No framework and no build step: it injects
  its own styles and the liquid-glass filter, and you wire it up with a single script tag.
- **The Worker** injects my bio as the system prompt, caps the history to the last ten
  turns, bounds each message, and only answers requests from my own domain, so nobody else
  can spend the quota.
- **Chat** runs on Groq's free tier (Llama 3.3 70B). **Voice** runs on ElevenLabs. I chose
  the stack so the whole thing costs close to nothing to run.

## The liquid glass

The panel is a port of the refraction technique from
[archisvaze/liquid-glass](https://github.com/archisvaze/liquid-glass): I compute a
per-pixel displacement map for the rounded-rectangle bezel using Snell's law, then drive an
SVG filter that `backdrop-filter` applies to whatever is behind the panel. It bends the
page at the edges like real glass. The displacement is Chromium-only, so other browsers
fall back to a plain frosted blur and still look the part.

## What it shows

A complete small product rather than a notebook: a server-side API proxy, sensible limits
so a public key cannot be abused, two third-party AI services wired together, a clone of my
own voice, and a UI detail I sweated over. It is the project I point to when someone wants
to see that I can ship something end to end.

## Tech stack

| Layer | Tools |
|-------|-------|
| Frontend | Vanilla JS (one file, no build) |
| Backend | Cloudflare Workers |
| Chat | Groq (Llama 3.3 70B) |
| Voice | ElevenLabs (voice clone) |
| UI effect | SVG displacement liquid glass |

---

Open the chat bubble in the corner of this site to try it, or read the
**[code on GitHub](https://github.com/Hamzas-github/ai-portfolio-chatbot)**.
