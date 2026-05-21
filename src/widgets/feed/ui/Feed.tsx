import {
  LinkBody,
  MOCK_POSTS,
  PhotoBody,
  PostCard,
  ProjectBody,
  type Post,
} from '@/entities/post';
import { LikeButton } from '@/features/like-post';
import { PollVote } from '@/features/poll-vote';
import styles from './Feed.module.css';

const renderBody = (post: Post) => {
  switch (post.type) {
    case 'photo':
      return <PhotoBody post={post} />;
    case 'project':
      return <ProjectBody post={post} />;
    case 'link':
      return <LinkBody post={post} />;
    case 'poll':
      return <PollVote post={post} />;
  }
};

export const Feed = () => {
  return (
    <div className={styles.list}>
      {MOCK_POSTS.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          actions={<LikeButton initialLikes={post.likes} />}
        >
          {renderBody(post)}
        </PostCard>
      ))}
    </div>
  );
};
