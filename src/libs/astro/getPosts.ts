import {type ContentCollectionKey, getCollection} from "astro:content";

export default async function getPosts(nameOfCollection: ContentCollectionKey) {
    return await getCollection(nameOfCollection);
}