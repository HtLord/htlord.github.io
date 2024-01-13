import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		tags: z.array(z.string()).default(["others"]),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().default('/blog-placeholder-4.jpg'),
		description: z.string().optional(),
	}),
});

const resume = defineCollection({
	type: 'data'
})

export const collections = {
	blog,
	resume,
};
