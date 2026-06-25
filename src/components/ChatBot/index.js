import {useEffect, useRef, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import LiquidGlass from './LiquidGlass';
import styles from './styles.module.css';

const GREETING = {
  role: 'assistant',
  content: "Hi, I'm Hamza. Ask me about my projects, skills, or background.",
};

// Fallback: browser's built-in voice, used only if the cloned voice fails.
function browserSpeak(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 1.02;
  window.speechSynthesis.speak(u);
}

// Speak with Hamza's cloned voice via the worker's /speak route; fall back to browser voice.
async function speak(text, endpoint) {
  try {
    const res = await fetch(endpoint.replace(/\/$/, '') + '/speak', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({text}),
    });
    if (!res.ok) throw new Error('tts');
    const audio = new Audio(URL.createObjectURL(await res.blob()));
    audio.play();
  } catch {
    browserSpeak(text);
  }
}

export default function ChatBot() {
  const {siteConfig} = useDocusaurusContext();
  const endpoint = siteConfig.customFields?.chatEndpoint;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);
  const panelRef = useRef(null);
  const greeted = useRef(false);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open, loading]);

  // Speak the greeting the first time the chat is opened (a user gesture, so audio is allowed).
  useEffect(() => {
    if (open && endpoint && !greeted.current) {
      greeted.current = true;
      speak(GREETING.content, endpoint);
    }
  }, [open, endpoint]);

  // No endpoint configured yet -> don't render the widget at all.
  if (!endpoint) return null;

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, {role: 'user', content: text}];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        // Send only user/assistant turns (drop the local greeting).
        body: JSON.stringify({messages: next.filter((m, i) => !(i === 0 && m === GREETING))}),
      });
      const data = await res.json();
      const reply = data.reply || "Sorry, I couldn't answer that. Try the contact links on the site.";
      setMessages((m) => [...m, {role: 'assistant', content: reply}]);
      speak(reply, endpoint); // auto read the answer aloud in Hamza's voice
    } catch {
      setMessages((m) => [...m, {role: 'assistant', content: 'Network error, please try again.'}]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className={styles.root}>
      <LiquidGlass panelRef={panelRef} radius={22} active={open} />
      {open && (
        <div className={styles.panel} ref={panelRef} role="dialog" aria-label="Chat with Hamza's assistant">
          <div className={styles.header}>
            <span>Ask about Hamza</span>
            <button className={styles.close} onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </div>
          <div className={styles.list} ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? styles.user : styles.bot}>
                <div className={styles.bubble}>{m.content}</div>
              </div>
            ))}
            {loading && <div className={styles.bot}><div className={styles.bubble}>…</div></div>}
          </div>
          <div className={styles.inputRow}>
            <textarea
              className={styles.input}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Type a question…"
            />
            <button className={styles.send} onClick={send} disabled={loading || !input.trim()}>Send</button>
          </div>
        </div>
      )}
      <button className={styles.fab} onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close chat' : 'Open chat'}>
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 3C6.99 3 3 6.36 3 10.5c0 2.2 1.13 4.17 2.94 5.52-.13 1.06-.6 2.3-1.54 3.32-.2.22-.06.58.23.6 1.86.12 3.6-.5 4.86-1.4 1.06.3 2.2.46 3.5.46 5.01 0 9-3.36 9-7.5S17.01 3 12 3z" />
          </svg>
        )}
      </button>
    </div>
  );
}
