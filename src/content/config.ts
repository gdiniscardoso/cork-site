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

// Race results: one JSON file per race in src/content/results/, holding every
// athlete of the race (not just the club's). Rows from the club CORK are
// highlighted on the page. `pos` = rank in the escalão list; `posGeral` =
// rank in the veterans' overall list (veterans only).
const results = defineCollection({
  type: 'data',
  schema: z.object({
    competition: z.string(),
    location: z.string().optional(),
    date: z.coerce.date(),
    rows: z.array(
      z.object({
        pos: z.number(),
        posGeral: z.number().optional(),
        dorsal: z.number(),
        name: z.string(),
        year: z.number(),
        club: z.string(),
        escalao: z.string(),
        sexo: z.enum(['FEM', 'MASC']),
        time: z.string(),
        extra: z.boolean().optional(),
      })
    ),
  }),
});

export const collections = { news, results };
