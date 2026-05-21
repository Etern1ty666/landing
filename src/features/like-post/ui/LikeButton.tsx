import { useState } from 'react';
import styles from './LikeButton.module.css';

type LikeButtonProps = {
  initialLikes: number;
};

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const LikeButton = ({ initialLikes }: LikeButtonProps) => {
  const [liked, setLiked] = useState(false);
  const [pulsing, setPulsing] = useState(false);

  const count = initialLikes + (liked ? 1 : 0);

  const handleClick = () => {
    setLiked((prev) => {
      const next = !prev;
      if (next) {
        setPulsing(true);
        window.setTimeout(() => setPulsing(false), 400);
      }
      return next;
    });
  };

  const className = [
    styles.button,
    liked && styles.liked,
    pulsing && styles.pulse,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      aria-pressed={liked}
      aria-label={liked ? 'Убрать лайк' : 'Поставить лайк'}
    >
      <span className={styles.icon}>
        <HeartIcon filled={liked} />
      </span>
      <span>{count}</span>
    </button>
  );
};
