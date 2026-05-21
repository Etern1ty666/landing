import type { Post } from './types';

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    type: 'project',
    createdAt: '2026-05-20T10:00:00Z',
    likes: 42,
    title: 'Lethal Sandbox',
    description:
      'Песочница на Unity для быстрой обкатки механик: стрельба, физика, AI. Всё, что нужно прогнать перед запуском в основной проект.',
    image: 'https://picsum.photos/seed/lethal/800/450',
    link: { url: 'https://github.com/Etern1ty666', label: 'GitHub' },
  },
  {
    id: 'p2',
    type: 'photo',
    createdAt: '2026-05-19T15:30:00Z',
    likes: 18,
    caption: 'Рабочее место собрано — можно стримить разработку',
    image: 'https://picsum.photos/seed/desk/800/600',
  },
  {
    id: 'p3',
    type: 'poll',
    createdAt: '2026-05-18T12:00:00Z',
    likes: 7,
    question: 'О чём писать следующий пост?',
    options: [
      { id: 'a', label: 'Как настроить FSD в React-проекте', votes: 23 },
      { id: 'b', label: 'Архитектура Unity-проекта', votes: 14 },
      { id: 'c', label: 'TypeScript: продвинутые типы', votes: 31 },
      { id: 'd', label: 'Свой Telegram-бот за вечер', votes: 9 },
    ],
  },
  {
    id: 'p4',
    type: 'link',
    createdAt: '2026-05-16T09:15:00Z',
    likes: 24,
    title: 'View Transitions API: интерактивные демки',
    description:
      'Подборка примеров с CSS-only анимациями переходов между состояниями страницы.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API',
    source: 'developer.mozilla.org',
    image: 'https://picsum.photos/seed/transitions/800/400',
  },
  {
    id: 'p5',
    type: 'project',
    createdAt: '2026-05-12T18:00:00Z',
    likes: 56,
    title: 'HabitBot для Telegram',
    description:
      'Лёгкий бот для трекинга привычек: добавляешь, отмечаешь каждый день, видишь статистику. Без подписок и рекламы.',
    image: 'https://picsum.photos/seed/habitbot/800/450',
    link: { url: 'https://t.me/Etern1ty666', label: 'Написать автору' },
  },
  {
    id: 'p6',
    type: 'photo',
    createdAt: '2026-05-08T19:45:00Z',
    likes: 33,
    caption: 'Закат после долгого дня',
    image: 'https://picsum.photos/seed/sunset/800/500',
  },
  {
    id: 'p7',
    type: 'link',
    createdAt: '2026-05-03T11:00:00Z',
    likes: 12,
    title: 'Feature-Sliced Design — официальная документация',
    description: 'Если кто-то ещё не разбирался с FSD — лучшая отправная точка.',
    url: 'https://feature-sliced.design/',
    source: 'feature-sliced.design',
  },
];
