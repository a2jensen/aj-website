import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Optional YouTube embed shared by every collection: the video ID (the part after
// watch?v=) plus optional start/end times in seconds to play only a clip.
const youtubeFields = {
	youtube: z.string().optional(),
	youtubeStart: z.number().optional(),
	youtubeEnd: z.number().optional(),
};

// One Markdown file per project; the filename is the URL slug (/projects/<slug>)
// and the Markdown body holds the project's general notes.
const projects = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/projects' }),
	schema: z.object({
		name: z.string(),
		description: z.string(),
		url: z.string().optional(),
		image: z.string(),
		tech: z.array(z.string()),
		order: z.number(),
		...youtubeFields,
	}),
});

// One Markdown file per piece; the filename is the URL slug (/art/<slug>)
// and the Markdown body holds any notes about the piece.
const art = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/art' }),
	schema: z.object({
		title: z.string(),
		image: z.string(),
		order: z.number(),
		...youtubeFields,
	}),
});

// One Markdown file per note; the filename is the URL slug (/notes/<slug>)
// and the Markdown body is the note itself.
const notes = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/notes' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		pubDate: z.coerce.date(),
		image: z.string().optional(),
		...youtubeFields,
	}),
});

export const collections = { projects, art, notes };
