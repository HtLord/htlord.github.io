export default function getPostInfoBy(
    posts: any[],
    tag: string,
) {
    return posts
        .filter(post => post.data.tags.includes(tag))
        .map(entry => {
            return {
                slug: entry.slug,
                title: entry.data.title,
            }
        });
}