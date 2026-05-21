import type { ReactNode } from 'react';
import type { Post } from '../model';
import { formatRelativeDate } from '../lib/format-date';
import { getPostTypeLabel } from '../lib/post-type-label';
import styles from './PostCard.module.css';

type PostCardProps = {
  post: Post;
  children: ReactNode;
  actions?: ReactNode;
};

export const PostCard = ({ post, children, actions }: PostCardProps) => {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <span className={styles.typeBadge}>{getPostTypeLabel(post.type)}</span>
        <span className={styles.date}>{formatRelativeDate(post.createdAt)}</span>
      </header>

      <div className={styles.body}>{children}</div>

      {actions && <footer className={styles.footer}>{actions}</footer>}
    </article>
  );
};
