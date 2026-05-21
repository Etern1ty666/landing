import type { PhotoPost } from '../model';
import styles from './bodies.module.css';

export const PhotoBody = ({ post }: { post: PhotoPost }) => (
  <>
    <img src={post.image} alt={post.caption ?? ''} className={styles.image} loading="lazy" />
    {post.caption && <p className={styles.caption}>{post.caption}</p>}
  </>
);
