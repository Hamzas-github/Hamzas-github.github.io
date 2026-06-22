---
id: eyespeak
title: EyeSpeak, Eye-Tracking Communication Board
sidebar_label: EyeSpeak
description: A webcam eye-tracking AAC board, real-time gaze and blink detection running entirely on-device in the browser.
keywords: [computer vision, eye tracking, AAC, accessibility, WebGazer, MediaPipe, WebAssembly, Web Speech API, JavaScript]
---

# EyeSpeak

> A webcam communication board you control with your eyes. Look at a card, blink on
> purpose, and it speaks the phrase out loud. Everything runs on-device in the browser.

[![Live demo](https://img.shields.io/badge/Live-demo-cc7b57)](https://hamzas-github.github.io/eyespeak/)
&nbsp;
[![Code on GitHub](https://img.shields.io/badge/Code-GitHub-181717?logo=github)](https://github.com/Hamzas-github/eyespeak)
&nbsp;
![JavaScript](https://img.shields.io/badge/Vanilla-JS-F7DF1E?logo=javascript&logoColor=black)
![WebAssembly](https://img.shields.io/badge/WebAssembly-on--device-654FF0?logo=webassembly&logoColor=white)

![EyeSpeak](/img/projects/eyespeak/cover.png)

## Why I built it

This one is a bit different from my data projects, and that's the point. I wanted to
build something that was genuinely hard and genuinely useful, not just analysis. AAC
(augmentative and alternative communication) tools help people who can't speak, and most
eye-gaze devices are expensive and locked to special hardware. So I tried to make a tiny
version that needs nothing but a laptop, a webcam, and a browser tab.

**[Try the live demo](https://hamzas-github.github.io/eyespeak/)** in Chrome, allow the
camera, and you can talk with your eyes.

## What it does

- **Four big targets at a time** (Yes, No, Food, Pain), with Food and Pain opening small
  sub-menus. Big cards mean rough gaze still lands on the right one.
- **Gaze cursor snaps** to the nearest card, so webcam jitter doesn't matter much.
- **Blink to select.** A deliberate, both-eyes-closed blink picks the highlighted card,
  with a ring that fills while your eyes are shut so you can see it registering.
- **Ignores noise.** Quick natural blinks, one eye, long closures and gaze drift all do
  nothing, which is the hard part.
- **Speaks and logs** every selection, and still works with mouse, touch and keyboard if
  the camera fails.

## How it works

One webcam stream feeds two models that both run on-device, nothing leaves the page:

- **WebGazer** estimates where you're looking and drives the cursor. A short
  look-at-the-dots routine trains it when the camera starts, and every selection
  re-trains it, so it gets more accurate with use.
- **MediaPipe Face Landmarker** reads per-eye eyelid closure from facial blendshapes, and
  a quick open/closed calibration sets the threshold that tells a deliberate blink apart
  from an ordinary one.

Under the hood it's plain ES modules split along clean layers, the pure decision logic
(when is a blink a real selection?) kept separate from the browser and hardware
adapters, so the tricky part is testable on its own.

## What it shows

Different muscles than my analytics work: real-time computer vision, on-device ML with
WebAssembly, a state machine for the blink logic, and a strong accessibility focus. It's
the project I point to when someone asks whether I can build, not just analyse.

## Tech stack

| Layer | Tools |
|-------|-------|
| Gaze tracking | WebGazer |
| Blink detection | MediaPipe Face Landmarker (WebAssembly) |
| Speech | Web Speech API |
| Camera | getUserMedia |
| App | Vanilla JS (ES modules) |
| Focus | Accessibility / AAC |

---

**[Open the live demo](https://hamzas-github.github.io/eyespeak/)** or read the
**[code on GitHub](https://github.com/Hamzas-github/eyespeak)**.
