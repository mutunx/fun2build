import useSWR, { Key, Fetcher } from 'swr'
import Parser from "rss-parser";
import {rssItem} from "../type";


const url: Key = "https://spac4fun.herokuapp.com/jandan/top-comments"
const fetcher:Fetcher<rssItem[],string> = (url) => fetch(url)
        .then(r=>r.text())
        .then(text => new Parser().parseString(text))
        .then(feed => feed.items as rssItem[])
        .then(comments => comments.map(c => {
            const [title,] = c.contentSnippet.split('\n');
            c.module = title;
            c.contentSnippet = c.contentSnippet.replace(c.module+'\n','');
            return c;
        }))
export function useComment() {
    const { data, error } = useSWR(url, fetcher)

    return {
        comment: data,
        isCommentLoading: !error && !data,
        isCommentError: error,
    }
}