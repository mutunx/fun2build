export type juConfig = {
        video: {
            followed: {url:string}[]
        },
        article: {
            followed: {url:string}[]
        },
        discussion: {
            followed: {url:string}[]
        },
        picture: {
            followed: {url:string}[]
        }
}

export type content = {
    title:string,
    coverURL:string,
    description:string,
    author:string,
    link:string,
    pubDate:string,
    recDate:string,
    loadContent: (config:juConfig) => void,
    content:string,
    comments: comment[] | null
}

export type comment = {
    author:string,
    pubDate:string,
    recDate:string,
    content:string,
    reply:comment | null
    replyId:string,
    id:string,
}
