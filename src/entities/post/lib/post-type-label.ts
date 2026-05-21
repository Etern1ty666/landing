import type { PostType } from '../model';

const LABELS: Record<PostType, string> = {
  photo: 'Фото',
  project: 'Проект',
  link: 'Ссылка',
  poll: 'Опрос',
};

export const getPostTypeLabel = (type: PostType): string => LABELS[type];
