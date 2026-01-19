import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost, BlogPostWithContent } from "./types/blog";

const postsDirectory = path.join(process.cwd(), "content/blog");

let cachedPosts: BlogPost[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = process.env.NODE_ENV === "production" ? 60 * 60 * 1000 : 5000;

export function getAllPosts(): BlogPost[] {
  const now = Date.now();
  if (cachedPosts && now - cacheTimestamp < CACHE_TTL) {
    return cachedPosts;
  }

  if (!fs.existsSync(postsDirectory)) {
    cachedPosts = [];
    cacheTimestamp = now;
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const stats = readingTime(content);

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        date: data.date || new Date().toISOString(),
        readingTime: stats.text,
        tags: data.tags || [],
        published: data.published !== false,
        image: data.image,
      } as BlogPost;
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  cachedPosts = allPosts;
  cacheTimestamp = now;
  return allPosts;
}

export function getPostBySlug(slug: string): BlogPostWithContent | null {
  if (!fs.existsSync(postsDirectory)) {
    return null;
  }

  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || new Date().toISOString(),
    readingTime: stats.text,
    tags: data.tags || [],
    published: data.published !== false,
    image: data.image,
    content,
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}
