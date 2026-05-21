type BasePost = {
  id: string;
  createdAt: string;
  likes: number;
};

export type PhotoPost = BasePost & {
  type: 'photo';
  image: string;
  caption?: string;
};

export type ProjectPost = BasePost & {
  type: 'project';
  title: string;
  description: string;
  image?: string;
  link?: { url: string; label: string };
};

export type LinkPost = BasePost & {
  type: 'link';
  title: string;
  url: string;
  source: string;
  description?: string;
  image?: string;
};

export type PollPost = BasePost & {
  type: 'poll';
  question: string;
  options: { id: string; label: string; votes: number }[];
};

export type Post = PhotoPost | ProjectPost | LinkPost | PollPost;

export type PostType = Post['type'];
