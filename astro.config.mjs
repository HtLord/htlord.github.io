import remarkToc from 'remark-toc';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    markdown: {
        // Applied to .md and .mdx files
        remarkPlugins: [remarkToc],
        rehypePlugins: [rehypeAccessibleEmojis],
    },
    site: 'https://htlord.github.io',
    integrations: [
        mdx(),
        tailwind({
            applyBaseStyles: false,
        }),
        sitemap(),
    ],
});