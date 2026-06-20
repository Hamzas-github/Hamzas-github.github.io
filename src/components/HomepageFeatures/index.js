import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const Skills = [
 {
 title: 'Data wrangling',
 description:
 'Cleaning, validating, and reshaping messy real-world data with Python and pandas, schema-agnostic detection, currency parsing, outlier handling.',
 tags: ['Python', 'pandas', 'NumPy'],
 },
 {
 title: 'SQL & databases',
 description:
 'Modelling data into relational tables and writing documented analytical queries, aggregations, window functions, value comparisons.',
 tags: ['SQL', 'SQLite'],
 },
 {
 title: 'Visualization & BI',
 description:
 'Publication-quality charts and interactive dashboards that non-technical stakeholders can read at a glance.',
 tags: ['Power BI', 'Matplotlib', 'Seaborn'],
 },
 {
 title: 'Analysis & reporting',
 description:
 'Turning analysis into clear findings and recommendations, executive summaries, reproducible documentation, honest data caveats.',
 tags: ['Statistics', 'Reporting'],
 },
];

function Skill({title, description, tags}) {
 return (
 <div className={styles.skill}>
 <Heading as="h3" className={styles.skillTitle}>{title}</Heading>
 <p className={styles.skillDesc}>{description}</p>
 <div className={styles.tagRow}>
 {tags.map((t) => (
 <span key={t} className={styles.tag}>{t}</span>
 ))}
 </div>
 </div>
 );
}

export default function HomepageFeatures() {
 return (
 <section className={styles.section}>
 <div className={clsx('container', styles.inner)}>
 <div className={styles.head}>
 <p className="mono-label">01. What I do</p>
 </div>
 <div className={styles.grid}>
 {Skills.map((props, idx) => (
 <Skill key={idx} {...props} />
 ))}
 </div>
 </div>
 </section>
 );
}
