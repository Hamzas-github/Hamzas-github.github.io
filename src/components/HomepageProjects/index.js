import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const Projects = [
  {
    plate: 'Tabula I',
    title: 'London Rental Market Analysis',
    blurb:
      'An end-to-end study of 2,838 London rental listings: raw Kaggle CSV → cleaned SQLite database → eight documented SQL queries → publication-quality charts → a Power BI dashboard.',
    image: 'img/projects/london-rental/02_most_expensive_areas.png',
    stack: ['Python', 'pandas', 'SQL', 'SQLite', 'Power BI'],
    to: '/projects/london-rental-analysis',
    repo: 'https://github.com/Hamzas-github/london-rental-analysis',
  },
];

function ProjectCard({plate, title, blurb, image, stack, to, repo}) {
  const img = useBaseUrl(image);
  return (
    <div className={clsx('lg-glass', 'lg-interactive', styles.card)}>
      <Link to={to} className={styles.thumbLink}>
        <div className={styles.thumb} style={{backgroundImage: `url(${img})`}}>
          <span className={styles.plateTag}>{plate}</span>
        </div>
      </Link>
      <div className={styles.body}>
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
            Read the entry
          </Link>
          <Link className="button button--secondary button--sm" href={repo}>
            Source on GitHub
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
          <div>
            <p className="roman-label">Opera — Selected Works</p>
            <Heading as="h2" className={styles.title}>The Plates</Heading>
          </div>
          <Link to="/projects/overview" className={styles.allLink}>All entries →</Link>
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
