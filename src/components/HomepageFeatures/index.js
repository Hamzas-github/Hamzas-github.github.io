import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const SkillGroups = [
  {
    numeral: 'I',
    title: 'Data Wrangling',
    icon: '🧹',
    description:
      'Cleaning, validating, and reshaping messy real-world data with Python and pandas — schema-agnostic detection, currency parsing, outlier handling.',
    tags: ['Python', 'pandas', 'NumPy'],
  },
  {
    numeral: 'II',
    title: 'SQL & Databases',
    icon: '🗄️',
    description:
      'Modelling data into relational tables and writing documented analytical queries — aggregations, window functions, value comparisons.',
    tags: ['SQL', 'SQLite', 'Data modelling'],
  },
  {
    numeral: 'III',
    title: 'Visualization & BI',
    icon: '📊',
    description:
      'Publication-quality charts in Matplotlib/Seaborn and interactive Power BI dashboards that non-technical readers grasp at a glance.',
    tags: ['Matplotlib', 'Seaborn', 'Power BI'],
  },
  {
    numeral: 'IV',
    title: 'Communication',
    icon: '✍️',
    description:
      'Translating analysis into clear findings and recommendations — executive summaries, reproducible documentation, and honest data caveats.',
    tags: ['Reporting', 'Storytelling', 'Documentation'],
  },
];

function SkillCard({numeral, icon, title, description, tags}) {
  return (
    <div className={clsx('col col--6', styles.cardCol)}>
      <div className={clsx('lg-glass', 'lg-interactive', styles.card)}>
        <div className={styles.cardHead}>
          <span className={styles.numeral}>{numeral}</span>
          <span className={styles.cardIcon} aria-hidden="true">{icon}</span>
        </div>
        <Heading as="h3" className={styles.cardTitle}>{title}</Heading>
        <p className={styles.cardDesc}>{description}</p>
        <div className={styles.tagRow}>
          {tags.map((t) => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHead}>
          <p className="roman-label">Artes — Disciplines</p>
          <Heading as="h2" className={styles.sectionTitle}>What I Do</Heading>
          <p className={styles.sectionLead}>
            A full analytics workflow — from raw data to the decision it supports.
          </p>
        </div>
        <div className="row">
          {SkillGroups.map((props, idx) => (
            <SkillCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
