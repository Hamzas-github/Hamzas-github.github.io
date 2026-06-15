import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const SkillGroups = [
  {
    title: 'Data wrangling',
    icon: '🧹',
    description:
      'Cleaning, validating, and reshaping messy real-world data with Python and pandas — schema-agnostic detection, currency parsing, outlier handling.',
    tags: ['Python', 'pandas', 'NumPy'],
  },
  {
    title: 'SQL & databases',
    icon: '🗄️',
    description:
      'Modelling data into SQLite/relational tables and writing documented analytical queries — aggregations, window functions, value comparisons.',
    tags: ['SQL', 'SQLite', 'Data modelling'],
  },
  {
    title: 'Visualization & BI',
    icon: '📊',
    description:
      'Publication-quality charts in Matplotlib/Seaborn and interactive Power BI dashboards that non-technical stakeholders can read at a glance.',
    tags: ['Matplotlib', 'Seaborn', 'Power BI'],
  },
  {
    title: 'Communication',
    icon: '✍️',
    description:
      'Translating analysis into clear findings and recommendations — written executive summaries, reproducible documentation, and honest data caveats.',
    tags: ['Reporting', 'Storytelling', 'Documentation'],
  },
];

function SkillCard({icon, title, description, tags}) {
  return (
    <div className={clsx('col col--6', styles.cardCol)}>
      <div className={styles.card}>
        <div className={styles.cardIcon} aria-hidden="true">{icon}</div>
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
          <Heading as="h2" className={styles.sectionTitle}>What I do</Heading>
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
