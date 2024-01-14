import {defineConfig} from 'astro/config';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
    vite: {
        plugins: [
            yaml()
        ]
    },
    markdown: {
        remarkPlugins: [[remarkToc, {heading: "ToC"}]],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, {behavior: 'append'}]],
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