import {useEffect, useRef} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageProjects from '@site/src/components/HomepageProjects';

import styles from './index.module.css';

// Reserved photo slot. Shows the real photo when personal.photo is set,
// otherwise a clean monogram placeholder. Future: set personal.photo in config.
function Avatar({personal}) {
 const photoUrl = useBaseUrl(personal.photo || '');
 const initials = personal.name
.split(' ')
.map((w) => w[0])
.slice(0, 2)
.join('');
 return (
 <div className={styles.avatar} aria-hidden={!personal.photo}>
 {personal.photo ? (
 <img src={photoUrl} alt={personal.fullName} className={styles.avatarImg} />
 ) : (
 <span className={styles.avatarInitials}>{initials}</span>
 )}
 </div>
 );
}

// Animated WebGL2 smoke background (fragment-shader fbm noise). Adapted from the
// "spooky smoke" shader; the bright parts are tinted with the site accent so the
// smoke reads in our orange. Falls back to the CSS background colour if WebGL2 is
// unavailable. ponytail: inlined GL setup (one shader, one fullscreen quad) instead
// of a class — there's only ever one instance.
const SMOKE_FRAG = `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
uniform vec3 u_color;
uniform vec3 u_bg;
uniform float u_strength;
#define FC gl_FragCoord.xy
#define R resolution
#define T (time+660.)
float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(rnd(i),rnd(i+vec2(1,0)),u.x),mix(rnd(i+vec2(0,1)),rnd(i+1.),u.x),u.y);}
float fbm(vec2 p){float t=.0,a=1.;for(int i=0;i<3;i++){t+=a*noise(p);p*=mat2(1,-1.2,.2,1.2)*2.;a*=.5;}return t;}
void main(){
  vec2 uv=(FC-.5*R)/R.y;
  uv.x+=.25;
  uv*=vec2(2,1);
  float n=fbm(uv*.28-vec2(T*.01,0));
  n=noise(uv*3.+n*2.);
  float a=fbm(uv+vec2(0,T*.015)+n);
  float b=fbm(uv*1.004+vec2(0,T*.015)+n+.004);
  float c=fbm(uv*1.008+vec2(0,T*.015)+n+.008);
  float w=clamp(1.-(a+b+c)/3.,0.,1.);
  w=pow(w,1.4)*u_strength*min(time*.12,1.);
  // accent wisps sitting on the page background, so text stays readable in both themes
  vec3 col=mix(u_bg,u_color,w);
  float l=dot(col,vec3(.299,.587,.114));
  col=mix(vec3(l),col,1.4); // saturation
  O=vec4(clamp(col,0.,1.),1);
}`;
const SMOKE_VERT = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

function hexToRgb(hex) {
 const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec((hex || '').trim());
 return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [0.8, 0.48, 0.34];
}

function SmokeBackground() {
 const ref = useRef(null);
 useEffect(() => {
  const canvas = ref.current;
  const gl = canvas && canvas.getContext('webgl2');
  if (!gl) return;

  const compile = (type, src) => {
   const s = gl.createShader(type);
   gl.shaderSource(s, src); gl.compileShader(s);
   if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
   return s;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, SMOKE_VERT));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, SMOKE_FRAG));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW);
  const pos = gl.getAttribLocation(prog, 'position');
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
  const uRes = gl.getUniformLocation(prog, 'resolution');
  const uTime = gl.getUniformLocation(prog, 'time');
  const uColor = gl.getUniformLocation(prog, 'u_color');
  const uBg = gl.getUniformLocation(prog, 'u_bg');
  const uStrength = gl.getUniformLocation(prog, 'u_strength');

  // Read the theme's background + accent so the smoke matches it (orange-on-dark
  // in dark mode, the complement on light), and re-read when the theme toggles.
  // Lower strength in light mode keeps the field bright enough for dark text.
  const readColors = () => {
   const cs = getComputedStyle(document.documentElement);
   const light = document.documentElement.getAttribute('data-theme') !== 'dark';
   return {
    bg: hexToRgb(cs.getPropertyValue('--bg')),
    color: hexToRgb(cs.getPropertyValue('--accent')),
    strength: light ? 0.62 : 1.0,
   };
  };
  let c = readColors();
  const themeObs = new MutationObserver(() => { c = readColors(); });
  themeObs.observe(document.documentElement, {attributes: true, attributeFilter: ['data-theme']});

  // Render at half resolution (the smoke is soft, so upscaling is invisible) to
  // keep it cheap on the GPU.
  const RES = 0.5;
  const resize = () => {
   canvas.width = Math.max(1, Math.round(canvas.clientWidth * RES));
   canvas.height = Math.max(1, Math.round(canvas.clientHeight * RES));
   gl.viewport(0, 0, canvas.width, canvas.height);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  const render = (now) => {
   gl.uniform2f(uRes, canvas.width, canvas.height);
   gl.uniform1f(uTime, now * 1e-3);
   gl.uniform3fv(uColor, c.color);
   gl.uniform3fv(uBg, c.bg);
   gl.uniform1f(uStrength, c.strength);
   gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  let raf, last = -1e3;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
   render(2000); // one static frame
  } else {
   const loop = (now) => {
    raf = requestAnimationFrame(loop);
    if (now - last < 33) return; // cap to ~30fps; the motion is slow
    last = now;
    render(now);
   };
   raf = requestAnimationFrame(loop);
  }
  return () => {
   cancelAnimationFrame(raf);
   ro.disconnect();
   themeObs.disconnect();
   gl.deleteProgram(prog);
   gl.deleteBuffer(buf);
  };
 }, []);
 return <canvas ref={ref} className={styles.smoke} aria-hidden="true" />;
}

function HomepageHeader() {
 const {siteConfig} = useDocusaurusContext();
 const {personal} = siteConfig.customFields;
 return (
 <header className={styles.hero}>
 <SmokeBackground />
 <div className={clsx('container', styles.heroInner)}>
 <div className={styles.heroText}>
 <p className={clsx('mono-label', styles.heroEyebrow)}>
 <span className={styles.statusDot} /> {personal.availability}
 </p>
 <Heading as="h1" className={styles.heroName}>
 {personal.name}
 </Heading>
 <p className={styles.heroRole}>
 Data Analyst &amp; AI Builder
 </p>
 <p className={styles.heroLede}>
 I'm a data analyst who genuinely likes the messy part, taking raw,
 real-world data and turning it into answers people can actually use. Clean
 analysis, clear charts, and dashboards, built with SQL, Python (pandas),
 and Power BI.
 </p>
 <div className={styles.heroActions}>
 <Link className="button button--lg liquid-glass liquid-glass--accent" to="/#work">
 View projects
 </Link>
 <Link className="button button--lg liquid-glass" to="/about">
 About me
 </Link>
 </div>
 <div className={styles.heroLinks}>
 <a href={personal.github} target="_blank" rel="noreferrer">GitHub</a>
 <a href={personal.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
 <a href={`mailto:${personal.email}`}>Email</a>
 </div>
 </div>
 <div className={styles.heroAside}>
 <Avatar personal={personal} />
 </div>
 </div>
 </header>
 );
}

export default function Home() {
 const {siteConfig} = useDocusaurusContext();
 return (
 <Layout
 title={`${siteConfig.customFields.personal.name}, ${siteConfig.customFields.personal.role}`}
 description="Data analyst and AI builder. SQL, Python and Power BI for the data, and shipping real products by directing AI tools like Claude, Cursor and Codex.">
 <HomepageHeader />
 <main>
 <HomepageFeatures />
 <HomepageProjects />
 </main>
 </Layout>
 );
}
