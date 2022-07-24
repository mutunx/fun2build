import useSWR, { Key, Fetcher } from 'swr'
import Parser from "rss-parser";
import {comment} from "../type";


const url: Key = "https://spac4fun.herokuapp.com/jandan/top-comments"
const fetcher:Fetcher<comment[],string> = (url) => fetch(url)
        .then(r=>r.text())
        .then(text => new Parser().parseString(text))
        .then(feed => feed.items as comment[])
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