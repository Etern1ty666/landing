import { useMemo, useState, type CSSProperties } from 'react';
import type { PollPost } from '@/entities/post';
import styles from './PollVote.module.css';

type PollVoteProps = {
  post: PollPost;
};

export const PollVote = ({ post }: PollVoteProps) => {
  const [votedFor, setVotedFor] = useState<string | null>(null);
  const [options, setOptions] = useState(post.options);

  const total = useMemo(
    () => options.reduce((sum, o) => sum + o.votes, 0),
    [options],
  );

  const handleVote = (optionId: string) => {
    if (votedFor) return;
    setVotedFor(optionId);
    setOptions((prev) =>
      prev.map((o) => (o.id === optionId ? { ...o, votes: o.votes + 1 } : o)),
    );
  };

  const hasVoted = votedFor !== null;

  return (
    <div className={styles.wrapper}>
      <p className={styles.question}>{post.question}</p>

      <div className={styles.options}>
        {options.map((option) => {
          const pct = total > 0 ? Math.round((option.votes / total) * 100) : 0;
          const isChosen = votedFor === option.id;
          const className = [styles.option, isChosen && styles.chosen]
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={option.id}
              type="button"
              className={className}
              onClick={() => handleVote(option.id)}
              disabled={hasVoted}
              style={
                hasVoted ? ({ '--bar-width': `${pct}%` } as CSSProperties) : undefined
              }
            >
              <span className={styles.bar} />
              <span className={styles.label}>{option.label}</span>
              {hasVoted && <span className={styles.pct}>{pct}%</span>}
            </button>
          );
        })}
      </div>

      <span className={styles.total}>
        {total} {pluralizeVotes(total)}
      </span>
    </div>
  );
};

const pluralizeVotes = (n: number): string => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'голос';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'голоса';
  return 'голосов';
};
