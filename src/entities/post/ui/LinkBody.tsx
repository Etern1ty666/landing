import type { LinkPost } from '../model';
import styles from './bodies.module.css';

export const LinkBody = ({ post }: { post: LinkPost }) => (
  <a
    href={post.url}
    target="_blank"
    rel="noopener noreferrer"
    className={styles.linkCard}
  >
    {post.image && (
      <img src={post.image} alt={post.title} className={styles.image} loading="lazy" />
    )}
    <span className={styles.linkSource}>{post.source}</span>
    <p className={styles.title}>{post.title}</p>
    {post.description && <p className={styles.text}>{post.description}</p>}
  </a>
);
