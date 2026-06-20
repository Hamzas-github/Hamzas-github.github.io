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

function HomepageHeader() {
 const {siteConfig} = useDocusaurusContext();
 const {personal} = siteConfig.customFields;
 return (
 <header className={styles.hero}>
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
 <Link className="button button--primary button--lg" to="/#work">
 View projects
 </Link>
 <Link className="button button--secondary button--lg" to="/about">
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
