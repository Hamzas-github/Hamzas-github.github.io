import {useEffect, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
import projects from '@site/src/data/projects';
import styles from './styles.module.css';

function ProjectRow({title, year, summary, stack, to, repo, image}) {
 const img = useBaseUrl(image || '');
 const titleEl = to ? <Link to={to}>{title}</Link> : title;
 return (
 <article className={styles.row}>
 {image && (
 <Link to={to || repo || '#'} className={styles.thumbLink}>
 <div className={styles.thumb} style={{backgroundImage: `url(${img})`}} />
 </Link>
 )}
 <div className={styles.rowBody}>
 <div className={styles.rowHead}>
 <Heading as="h3" className={styles.rowTitle}>{titleEl}</Heading>
 {year && <span className={styles.year}>{year}</span>}
 </div>
 <p className={styles.summary}>{summary}</p>
 <div className={styles.tagRow}>
 {stack.map((s) => (
 <span key={s} className={styles.tag}>{s}</span>
 ))}
 </div>
 <div className={styles.links}>
 {to && <Link to={to} className={styles.link}>Case study</Link>}
 {repo && (
 <Link to={repo} className={styles.link}>GitHub</Link>
 )}
 </div>
 </div>
 </article>
 );
}

// Random order on each load. Shuffles after mount so the server-rendered HTML and the
// first client paint match (no hydration mismatch), then reorders.
function shuffle(arr) {
 const a = [...arr];
 for (let i = a.length - 1; i > 0; i--) {
 const j = Math.floor(Math.random() * (i + 1));
 [a[i], a[j]] = [a[j], a[i]];
 }
 return a;
}

export default function HomepageProjects() {
 const [list, setList] = useState(projects);
 useEffect(() => { setList(shuffle(projects)); }, []);
 return (
 <section id="work" className={styles.section}>
 <div className={clsx('container', styles.inner)}>
 <div className={styles.head}>
 <p className="mono-label">02. Selected work</p>
 </div>
 <div className={styles.list}>
 {list.map((p) => (
 <ProjectRow key={p.title} {...p} />
 ))}
 </div>
 </div>
 </section>
 );
}
