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
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={clsx('lg-glass', styles.heroPlate)}>
          <p className={clsx('roman-label', styles.heroMotto)}>
            Ex datis, consilium · From data, counsel
          </p>

          <Heading as="h1" className={styles.heroName}>
            {personal.name}
          </Heading>

          <p className={styles.heroDefinition}>
            <span className={styles.heroPron}>/dā-tə ˈa-nə-list/</span>
            &nbsp;·&nbsp;<strong>data analyst</strong>, <em>n.</em>
          </p>

          <div className="ornament"><span>※</span></div>

          <p className={styles.heroGloss}>
            One who turns raw, messy data into clean and defensible{' '}
            <span className={styles.heroAccent}>decisions</span> — through careful
            cleaning, SQL, and clear visual storytelling.
          </p>

          <div className={styles.heroButtons}>
            <Link className="button button--primary button--lg" to="/projects/overview">
              View the plates
            </Link>
            <Link className="button button--secondary button--lg" to="/about">
              The author
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
