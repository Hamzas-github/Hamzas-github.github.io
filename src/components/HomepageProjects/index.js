import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const Projects = [
  {
    title: 'London Rental Market Analysis',
    blurb:
      'End-to-end analytics: raw Kaggle CSV → cleaned SQLite database → 8 documented SQL queries → publication-quality charts → Power BI dashboard. 2,838 properties analysed.',
    image: 'img/projects/london-rental/02_most_expensive_areas.png',
    stack: ['Python', 'pandas', 'SQL', 'SQLite', 'Power BI'],
    to: '/projects/london-rental-analysis',
    repo: 'https://github.com/Hamzas-github/london-rental-analysis',
    featured: true,
  },
];

function ProjectCard({title, blurb, image, stack, to, repo, featured}) {
  const img = useBaseUrl(image);
  return (
    <div className={clsx(styles.card, featured && styles.featured)}>
      <Link to={to} className={styles.thumbLink}>
        <div className={styles.thumb} style={{backgroundImage: `url(${img})`}} />
      </Link>
      <div className={styles.body}>
        {featured && <span className={styles.badge}>Featured</span>}
        <Heading as="h3" className={styles.cardTitle}>
          <Link to={to}>{title}</Link>
        </Heading>
        <p className={styles.blurb}>{blurb}</p>
        <div className={styles.stack}>
          {stack.map((s) => (
            <span key={s} className={styles.chip}>{s}</span>
          ))}
        </div>
        <div className={styles.actions}>
          <Link className="button button--primary button--sm" to={to}>
            Read the case study
          </Link>
          <Link className="button button--secondary button--sm" href={repo}>
            Code on GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomepageProjects() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <Heading as="h2" className={styles.title}>Featured project</Heading>
          <Link to="/projects/overview" className={styles.allLink}>All projects →</Link>
        </div>
        <div className={styles.grid}>
          {Projects.map((p, i) => (
            <ProjectCard key={i} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
