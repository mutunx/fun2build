type juConfig = {
    source: {
        video: [
            {followed:string}
        ],
        article: [
            {followed:string}
        ],
        discussion: [
            {followed:string}
        ],
        picture: [
            {followed:string}
        ]
    }
}


type video = {
    title:string,
    coverURL:string,
    description:string,
    author:string,
    link:string,
    pubDate:string,
}