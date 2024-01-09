export default function getTagByCollection(posts: any[]) {
    return new Set<string>(...[posts
        .map(post => post.data.tags)
        .flat()]);
}
