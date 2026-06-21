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

// Lava-lamp background: a tiny particle sim (5 blobs). Each has velocity, gentle
// buoyancy, and soft pairwise repulsion that weakens when two blobs approach
// fast — so they bounce apart normally but merge through on strong momentum (the
// CSS blur fuses the overlap). Also repelled gently by the cursor. ~10 pair
// checks/frame, so it stays cheap.
function HeroLava() {
 const ref = useRef(null);
 useEffect(() => {
  const root = ref.current;
  if (!root) return;
  const els = [...root.querySelectorAll('i')];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rand = (a, b) => a + Math.random() * (b - a);
  let W = root.clientWidth, H = root.clientHeight;
  const onResize = () => { W = root.clientWidth; H = root.clientHeight; };
  window.addEventListener('resize', onResize);

  const P = els.map((el) => {
   const r = (el.offsetWidth || 160) / 2;
   return {x: rand(r, W - r), y: rand(r, H - r), vx: rand(-6, 6), vy: rand(-6, 6), r};
  });
  let mouse = {x: -1e4, y: -1e4};
  const onMove = (e) => {
   const b = root.getBoundingClientRect();
   mouse = {x: e.clientX - b.left, y: e.clientY - b.top};
  };
  window.addEventListener('mousemove', onMove);

  let raf, last = performance.now();
  const tick = (t) => {
   let dt = (t - last) / 16.67; last = t; if (dt > 3) dt = 3;
   if (!reduce) {
    for (let i = 0; i < P.length; i++) {
     const a = P[i];
     a.vy += Math.sin(t / 1000 * 0.3 + i) * 0.05 * dt;       // buoyancy bob
     a.vx += Math.sin(t / 1000 * 0.22 + i * 2) * 0.035 * dt;
     for (let j = i + 1; j < P.length; j++) {
      const b = P[j];
      const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 0.001;
      const min = (a.r + b.r) * 0.8;
      if (d < min) {
       const rel = Math.hypot(a.vx - b.vx, a.vy - b.vy);
       const join = Math.min(rel / 13, 1);                   // fast approach -> merge
       const f = (1 - d / min) * 0.5 * (1 - join) * dt;
       const ux = dx / d, uy = dy / d;
       a.vx -= ux * f; a.vy -= uy * f; b.vx += ux * f; b.vy += uy * f;
      }
     }
     const mdx = a.x - mouse.x, mdy = a.y - mouse.y, md = Math.hypot(mdx, mdy);
     if (md < 210 && md > 0) { const f = (1 - md / 210) * 5 * dt; a.vx += (mdx / md) * f; a.vy += (mdy / md) * f; }
     a.vx *= 0.985; a.vy *= 0.985;
     a.x += a.vx * dt; a.y += a.vy * dt;
     if (a.x < a.r) { a.x = a.r; a.vx = Math.abs(a.vx) * 0.6; }
     if (a.x > W - a.r) { a.x = W - a.r; a.vx = -Math.abs(a.vx) * 0.6; }
     if (a.y < a.r) { a.y = a.r; a.vy = Math.abs(a.vy) * 0.6; }
     if (a.y > H - a.r) { a.y = H - a.r; a.vy = -Math.abs(a.vy) * 0.6; }
    }
   }
   for (let i = 0; i < els.length; i++) {
    els[i].style.transform = `translate(${P[i].x}px, ${P[i].y}px) translate(-50%, -50%)`;
   }
   raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => {
   cancelAnimationFrame(raf);
   window.removeEventListener('mousemove', onMove);
   window.removeEventListener('resize', onResize);
  };
 }, []);
 return (
  <div className={styles.lava} ref={ref} aria-hidden="true">
   <i /><i /><i /><i /><i />
  </div>
 );
}

function HomepageHeader() {
 const {siteConfig} = useDocusaurusContext();
 const {personal} = siteConfig.customFields;
 return (
 <header className={styles.hero}>
 <HeroLava />
 <div className={clsx('container', styles.heroInner)}>
 <div className={styles.heroText}>
 <p className={clsx('mono-label', styles.heroEyebrow)}>
 <span className={styles.statusDot} /> {personal.availability}
 </p>
 <Heading as="h1" className={styles.heroName}>
 {personal.name}
 </Heading>
 <p className={styles.heroRole}>
 Data Analyst, <span className={styles.heroAccent}>SQL, Python &amp; Power BI</span>
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
 title={`${siteConfig.customFields.personal.name}, Data Analyst`}
 description="Data Analyst specializing in SQL, Python, and data visualization. Turning raw data into clear, decision-ready insights and dashboards.">
 <HomepageHeader />
 <main>
 <HomepageFeatures />
 <HomepageProjects />
 </main>
 </Layout>
 );
}
