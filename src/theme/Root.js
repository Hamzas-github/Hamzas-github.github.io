import React, {useEffect} from 'react';
import ChatBot from '@site/src/components/ChatBot';

export default function Root({children}) {
  // Orange-dot cursor that follows the mouse. Over an image it spans into the image
  // and fades, handing off to the image glow. Links are no longer magnetic.
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
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
      setTarget(imageLike(e.target), 'image');
    };
    const onLeave = () => { visible = false; };
    const onEnter = () => { visible = true; };

    const frame = () => {
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
      <ChatBot />
    </>
  );
}
