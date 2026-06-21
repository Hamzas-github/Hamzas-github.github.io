import React, {useEffect} from 'react';

// Liquid-glass effect ported from archisvaze/liquid-glass: a per-element
// displacement map (Snell's-law refraction concentrated in the rounded corners)
// drives `backdrop-filter`, so the glass actually bends what's behind it.
// ponytail: dropped the source's specular SVG layer (CSS rim highlight covers
// it) and the live parameter UI; the constants below are the tuning knobs.
const IOR = 1.8;        // refractive index — higher = stronger bend
const THICK = 58;       // glass thickness — overall displacement strength
const BLUR = 1.2;       // backdrop blur in px
const heightFn = (x) => Math.sqrt(Math.max(0, 1 - (1 - x) ** 2)); // convex lip

function refractionProfile(thick, bezel, samples = 128) {
  const eta = 1 / IOR;
  const p = new Float64Array(samples);
  for (let i = 0; i < samples; i++) {
    const x = i / samples;
    const y = heightFn(x);
    const dx = x < 1 ? 1e-4 : -1e-4;
    const deriv = (heightFn(x + dx) - y) / dx;
    const mag = Math.hypot(deriv, 1);
    const nx = -deriv / mag;
    const ny = -1 / mag;
    const k = 1 - eta * eta * (1 - ny * ny);
    if (k < 0) { p[i] = 0; continue; }
    const sq = Math.sqrt(k);
    const rx = -(eta * ny + sq) * nx;
    const ry = eta - (eta * ny + sq) * ny;
    p[i] = rx * ((y * bezel + thick) / ry);
  }
  return p;
}

function displacementMap(w, h, radius, bezel, profile, maxDisp) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) { d[i] = 128; d[i + 1] = 128; d[i + 3] = 255; }

  const r = radius, rSq = r * r, r1Sq = (r + 1) ** 2;
  const rBSq = Math.max(r - bezel, 0) ** 2;
  const wB = w - r * 2, hB = h - r * 2, S = profile.length;
  for (let y1 = 0; y1 < h; y1++) {
    for (let x1 = 0; x1 < w; x1++) {
      const x = x1 < r ? x1 - r : x1 >= w - r ? x1 - r - wB : 0;
      const y = y1 < r ? y1 - r : y1 >= h - r ? y1 - r - hB : 0;
      const dSq = x * x + y * y;
      if (dSq > r1Sq || dSq < rBSq) continue;
      const dist = Math.sqrt(dSq);
      if (dist === 0) continue;
      const op = dSq < rSq ? 1 : 1 - (dist - Math.sqrt(rSq)) / (Math.sqrt(r1Sq) - Math.sqrt(rSq));
      if (op <= 0) continue;
      const bi = Math.min((((r - dist) / bezel) * S) | 0, S - 1);
      const disp = profile[bi] || 0;
      const idx = (y1 * w + x1) * 4;
      d[idx] = (128 + (-x / dist * disp / maxDisp) * 127 * op + 0.5) | 0;
      d[idx + 1] = (128 + (-y / dist * disp / maxDisp) * 127 * op + 0.5) | 0;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL();
}

function buildFilter(defs, id, el) {
  const w = el.offsetWidth, h = el.offsetHeight;
  if (w < 2 || h < 2) return;
  const radius = Math.min(h / 2, 60);              // pill ends
  const bezel = Math.max(radius - 1, 4);
  const profile = refractionProfile(THICK, bezel);
  const maxDisp = Math.max(...Array.from(profile, Math.abs)) || 1;
  const url = displacementMap(w, h, radius, bezel, profile, maxDisp);

  defs.querySelector(`#${id}`)?.remove();
  const NS = 'http://www.w3.org/2000/svg';
  const f = document.createElementNS(NS, 'filter');
  f.setAttribute('id', id);
  f.setAttribute('color-interpolation-filters', 'sRGB');
  f.innerHTML =
    `<feImage href="${url}" x="0" y="0" width="${w}" height="${h}" result="m"/>` +
    `<feDisplacementMap in="SourceGraphic" in2="m" scale="${maxDisp}" ` +
    `xChannelSelector="R" yChannelSelector="G"/>`;
  defs.appendChild(f);
  const fl = `blur(${BLUR}px) url(#${id}) saturate(1.5) brightness(1.06)`;
  el.style.backdropFilter = fl;
  el.style.webkitBackdropFilter = fl;
}

export default function Root({children}) {
  useEffect(() => {
    const defs = document.getElementById('lg-defs');
    if (!defs) return;
    const els = [...document.querySelectorAll('.liquid-glass')];
    // Coalesce to one rebuild per frame per element — the hover grow-animation
    // fires a stream of resize events we don't need to regenerate canvas for.
    const pending = new WeakMap();
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const el = e.target;
        if (pending.get(el)) continue;
        pending.set(el, requestAnimationFrame(() => {
          pending.delete(el);
          buildFilter(defs, el.dataset.lg, el);
        }));
      }
    });
    els.forEach((el, i) => {
      el.dataset.lg = `lg-${i}`;
      buildFilter(defs, el.dataset.lg, el);
      ro.observe(el);
    });
    return () => ro.disconnect();
  }, []);

  // Magnetic orange-dot cursor. Over a link it eases into an orange underline
  // (and nudges the element bigger); over an image it leaves a small dot and
  // gives the image a glow + slight grow.
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const SEL = 'a, button, [role="button"], summary, input, textarea, select';
    const SNAP = 44;
    const dot = document.createElement('div');
    dot.id = 'magic-cursor';
    document.body.appendChild(dot);

    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my, raf;
    let cur = null, curType = null, visible = true, op = 1;

    const imageLike = (el) => {
      for (let n = el, i = 0; n instanceof Element && n !== document.body && i < 3; n = n.parentElement, i++) {
        if (n.tagName === 'IMG') return n;
        if (getComputedStyle(n).backgroundImage.includes('url(')) return n;
      }
      return null;
    };
    const setTarget = (el, type) => {
      if (cur === el && curType === type) return;
      if (cur) cur.classList.remove('mc-link', 'mc-img');
      cur = el; curType = type;
      if (!el) return;
      el.classList.add(type === 'image' ? 'mc-img' : 'mc-link');
    };

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY; visible = true;
      const img = imageLike(e.target);
      if (img) { setTarget(img, 'image'); return; }
      let best = null, bestD = Infinity;
      for (const el of document.querySelectorAll(SEL)) {
        const r = el.getBoundingClientRect();
        if (!r.width) continue;
        const dx = Math.max(r.left - mx, 0, mx - r.right);
        const dy = Math.max(r.top - my, 0, my - r.bottom);
        const d = Math.hypot(dx, dy);
        if (d < bestD) { bestD = d; best = el; }
      }
      setTarget(bestD <= SNAP ? best : null, 'link');
    };
    const onLeave = () => { visible = false; };
    const onEnter = () => { visible = true; };

    const frame = () => {
      // Idle: a visible dot following the mouse. Near a target: the dot spans
      // into the element's centre and fades out, handing off to the element's
      // own hover effect (underline / glass glow / image glow).
      let tx = mx, ty = my, opTarget = visible ? 1 : 0;
      if (cur) {
        const r = cur.getBoundingClientRect();
        tx = r.left + r.width / 2; ty = r.top + r.height / 2;
        opTarget = 0;
      }
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      op += (opTarget - op) * 0.16;
      dot.style.opacity = op.toFixed(3);
      dot.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(frame);
    };

    addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    frame();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      setTarget(null, null);
      dot.remove();
    };
  }, []);

  // Reveal each section/card as it scrolls into view. Classes are added in JS
  // so no-JS visitors aren't left with hidden content.
  useEffect(() => {
    const targets = document.querySelectorAll('main section, main article');
    if (!targets.length) return;
    targets.forEach((t) => t.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('reveal--in');
          io.unobserve(e.target);
        }
      }
    }, {threshold: 0.12, rootMargin: '0px 0px -8% 0px'});
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {children}
      <svg width="0" height="0" aria-hidden="true" style={{position: 'absolute'}}>
        <defs id="lg-defs" />
      </svg>
    </>
  );
}
