import {useEffect} from 'react';

// Liquid-glass refraction, ported from github.com/archisvaze/liquid-glass (SVG version).
// Builds a per-pixel displacement map + specular map for the panel's rounded-rect bezel
// (Snell's-law refraction) and drives an SVG filter that `backdrop-filter` applies to the
// LIVE page behind the panel. Chromium-only for the refraction; other browsers fall back
// to the plain frosted blur set in CSS.
const FILTER_ID = 'chatLiquidGlass';

// Tuning knobs (mirrors the repo's controls; trimmed for a small readable chat panel).
const SURFACE = (x) => Math.pow(1 - Math.pow(1 - x, 4), 0.25); // convex_squircle
const GLASS_THICKNESS = 70;
const BEZEL = 60; // clamped to the radius below
const IOR = 2.2;
const SCALE_RATIO = 1;
const BLUR = 0.4;
const SPEC_OPACITY = 0.5;
const SPEC_SATURATION = 4;

function refractionProfile(glassThickness, bezelWidth, ior, samples = 128) {
  const eta = 1 / ior;
  const refract = (nx, ny) => {
    const k = 1 - eta * eta * (1 - ny * ny);
    if (k < 0) return null;
    const sq = Math.sqrt(k);
    return [-(eta * ny + sq) * nx, eta - (eta * ny + sq) * ny];
  };
  const profile = new Float64Array(samples);
  for (let i = 0; i < samples; i++) {
    const x = i / samples;
    const y = SURFACE(x);
    const dx = x < 1 ? 0.0001 : -0.0001;
    const deriv = (SURFACE(x + dx) - y) / dx;
    const mag = Math.sqrt(deriv * deriv + 1);
    const ref = refract(-deriv / mag, -1 / mag);
    profile[i] = ref ? ref[0] * ((y * bezelWidth + glassThickness) / ref[1]) : 0;
  }
  return profile;
}

function displacementMap(w, h, radius, bezelWidth, profile, maxDisp) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) { d[i] = 128; d[i + 1] = 128; d[i + 2] = 0; d[i + 3] = 255; }
  const r = radius, rSq = r * r, r1Sq = (r + 1) ** 2, rBSq = Math.max(r - bezelWidth, 0) ** 2;
  const wB = w - r * 2, hB = h - r * 2, S = profile.length;
  for (let y1 = 0; y1 < h; y1++) {
    for (let x1 = 0; x1 < w; x1++) {
      const x = x1 < r ? x1 - r : x1 >= w - r ? x1 - r - wB : 0;
      const y = y1 < r ? y1 - r : y1 >= h - r ? y1 - r - hB : 0;
      const dSq = x * x + y * y;
      if (dSq > r1Sq || dSq < rBSq) continue;
      const dist = Math.sqrt(dSq);
      const fromSide = r - dist;
      const op = dSq < rSq ? 1 : 1 - (dist - Math.sqrt(rSq)) / (Math.sqrt(r1Sq) - Math.sqrt(rSq));
      if (op <= 0 || dist === 0) continue;
      const cos = x / dist, sin = y / dist;
      const bi = Math.min(((fromSide / bezelWidth) * S) | 0, S - 1);
      const disp = profile[bi] || 0;
      const idx = (y1 * w + x1) * 4;
      d[idx] = (128 + (-cos * disp) / maxDisp * 127 * op + 0.5) | 0;
      d[idx + 1] = (128 + (-sin * disp) / maxDisp * 127 * op + 0.5) | 0;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL();
}

function specularMap(w, h, radius, bezelWidth, angle = Math.PI / 3) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(w, h);
  const d = img.data;
  d.fill(0);
  const r = radius, rSq = r * r, r1Sq = (r + 1) ** 2, rBSq = Math.max(r - bezelWidth, 0) ** 2;
  const wB = w - r * 2, hB = h - r * 2, sv = [Math.cos(angle), Math.sin(angle)];
  for (let y1 = 0; y1 < h; y1++) {
    for (let x1 = 0; x1 < w; x1++) {
      const x = x1 < r ? x1 - r : x1 >= w - r ? x1 - r - wB : 0;
      const y = y1 < r ? y1 - r : y1 >= h - r ? y1 - r - hB : 0;
      const dSq = x * x + y * y;
      if (dSq > r1Sq || dSq < rBSq) continue;
      const dist = Math.sqrt(dSq);
      const fromSide = r - dist;
      const op = dSq < rSq ? 1 : 1 - (dist - Math.sqrt(rSq)) / (Math.sqrt(r1Sq) - Math.sqrt(rSq));
      if (op <= 0 || dist === 0) continue;
      const cos = x / dist, sin = -y / dist;
      const dot = Math.abs(cos * sv[0] + sin * sv[1]);
      const edge = Math.sqrt(Math.max(0, 1 - (1 - fromSide) ** 2));
      const coeff = dot * edge;
      const col = (255 * coeff) | 0;
      const idx = (y1 * w + x1) * 4;
      d[idx] = col; d[idx + 1] = col; d[idx + 2] = col;
      d[idx + 3] = (col * coeff * op) | 0;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL();
}

// Inject/update the SVG filter to match the panel's current size + radius.
export default function LiquidGlass({panelRef, radius = 22, active}) {
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    const build = () => {
      const w = el.offsetWidth, h = el.offsetHeight;
      if (w < 2 || h < 2) return;
      const bezel = Math.min(BEZEL, radius - 1, Math.min(w, h) / 2 - 1);
      const profile = refractionProfile(GLASS_THICKNESS, bezel, IOR);
      const maxDisp = Math.max(...Array.from(profile).map(Math.abs)) || 1;
      const dispUrl = displacementMap(w, h, radius, bezel, profile, maxDisp);
      const specUrl = specularMap(w, h, radius, bezel * 2.5);
      const scale = maxDisp * SCALE_RATIO;
      document.getElementById(`${FILTER_ID}-defs`).innerHTML = `
        <filter id="${FILTER_ID}" x="0%" y="0%" width="100%" height="100%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="${BLUR}" result="blurred" />
          <feImage href="${dispUrl}" x="0" y="0" width="${w}" height="${h}" result="disp" />
          <feDisplacementMap in="blurred" in2="disp" scale="${scale}" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feColorMatrix in="displaced" type="saturate" values="${SPEC_SATURATION}" result="sat" />
          <feImage href="${specUrl}" x="0" y="0" width="${w}" height="${h}" result="spec" />
          <feComposite in="sat" in2="spec" operator="in" result="specMasked" />
          <feComponentTransfer in="spec" result="specFaded"><feFuncA type="linear" slope="${SPEC_OPACITY}" /></feComponentTransfer>
          <feBlend in="specMasked" in2="displaced" mode="normal" result="withSat" />
          <feBlend in="specFaded" in2="withSat" mode="normal" />
        </filter>`;
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(el);
    return () => ro.disconnect();
  }, [panelRef, radius, active]);

  return (
    <svg aria-hidden="true" style={{position: 'absolute', width: 0, height: 0}}>
      <defs id={`${FILTER_ID}-defs`} />
    </svg>
  );
}
