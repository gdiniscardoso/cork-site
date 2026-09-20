import { defineCollection, z } from 'astro:content';

// News posts: each is a Markdown file in src/content/news/
// Adding a post = adding a .md file. No layout changes needed.
const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    author: z.string().optional(),
    image: z.string().optional(),
  }),
});

// Athlete results: one JSON file per season/event, listed in src/content/results/
const results = defineCollection({
  type: 'data',
  schema: z.object({
    athlete: z.string(),
    event: z.string(),
    date: z.coerce.date(),
    competition: z.string(),
    result: z.string(),
    category: z.string().optional(),
  }),
});

export const collections = { news, results };
