type tucao = {
    "comment_ID": number,
    "comment_post_ID": number,
    "comment_author": string,
    "comment_date": string,
    "comment_date_int": number,
    "comment_content": string,
    "comment_parent": number,
    "comment_reply_ID": number,
    "comment_reply": tucao | null,
    "is_jandan_user": number,
    "is_tip_user": number,
    "vote_positive": number,
    "vote_negative": number,
    "sub_comment_count": number,
    "images": string | null,
    "ip_location": string
}
type comment = {
    author: string,
    content: string,
    contentSnippet: string,
    creator: string,
    guid: string,
    isoDate: string,
    link: string,
    pubDate: string,
    title: string,
    module:string,
    active: string,
}

export type {comment,tucao}