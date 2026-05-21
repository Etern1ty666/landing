import type { ProjectPost } from '../model';
import styles from './bodies.module.css';

export const ProjectBody = ({ post }: { post: ProjectPost }) => (
  <>
    {post.image && (
      <img src={post.image} alt={post.title} className={styles.image} loading="lazy" />
    )}
    <p className={styles.title}>{post.title}</p>
    <p className={styles.text}>{post.description}</p>
    {post.link && (
      <a
        href={post.link.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.projectLink}
      >
        {post.link.label}
      </a>
    )}
  </>
);
