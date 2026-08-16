import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    format: z.enum(['essay', 'observation', 'note', 'question']),
    pillar: z.enum(['technology', 'travel', 'productivity', 'philosophy', 'culture']),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    location: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing };
