import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageProjects from '@site/src/components/HomepageProjects';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const {personal} = siteConfig.customFields;
  return (
    <header className={clsx(styles.heroBanner)}>
      <div className="container">
        <p className={styles.heroEyebrow}>{personal.role}</p>
        <Heading as="h1" className={styles.heroTitle}>
          Hi, I&apos;m {personal.name.split(' ').slice(-1)[0]}. I turn messy data
          into <span className={styles.heroAccent}>decisions</span>.
        </Heading>
        <p className={styles.heroSubtitle}>
          I build end-to-end analytics — from raw CSVs to cleaned databases, SQL
          analysis, and dashboards that non-technical stakeholders actually use.
        </p>
        <div className={styles.heroButtons}>
          <Link className="button button--primary button--lg" to="/projects/overview">
            View my work →
          </Link>
          <Link className="button button--secondary button--lg" to="/about">
            About me
          </Link>
        </div>
        <div className={styles.heroLinks}>
          <a href={personal.github} target="_blank" rel="noreferrer">GitHub</a>
          <span>·</span>
          <a href={personal.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <span>·</span>
          <a href={`mailto:${personal.email}`}>Email</a>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Data Analyst Portfolio"
      description={`${siteConfig.customFields.personal.name} — Data Analyst. SQL, Python, pandas, and data visualization portfolio.`}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageProjects />
      </main>
    </Layout>
  );
}
