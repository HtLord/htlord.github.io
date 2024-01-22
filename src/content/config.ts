import {defineCollection, z} from 'astro:content';

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
    type: 'data',
    schema: z.object({
        you: z.object({
            name: z.string(),
            title: z.string(),
            contacts:
                z.array(
                    z.object({
                        icon: z.string(),
                        name: z.string(),
                        value: z.string(),
                    })
                ).optional(),
        }),
        summary: z.string(),
        skills: z.array(z.string()).optional(),
        strengths: z.array(z.string()).optional(),
        educations:
            z.array(
                z.object({
                    university: z.string(),
                    degree: z.string(),
                    period: z.string(),
                })
            ),
        experiences: z.array(
            z.object({
                name: z.string(),
                period: z.string(),
                title: z.string(),
                stack: z.array(z.string()).optional(),
                achievements: z.array(z.object({
                    description: z.string(),
                    references: z.array(z.string()).optional(),
                })).optional(),
            })).optional(),
    })
})

export const collections = {
    blog,
    resume,
};
