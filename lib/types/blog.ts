export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  published: boolean;
  image?: string;
};

export type BlogPostWithContent = BlogPost & {
  content: string;
};
