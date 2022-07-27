import useSWR, { Key, Fetcher } from 'swr'
import Parser from "rss-parser";
import {rssItem} from "../type";


const url: Key = "https://spac4fun.herokuapp.com/v2ex/post/"
const fetcher:Fetcher<rssItem[],string> = (url) => fetch(url)
        .then(r=>r.text())
        .then(text => new Parser().parseString(text))
        .then(feed => feed.items as rssItem[])
    .then(rssItems => {
        console.log(rssItems)
        return rssItems;
    })

export function useV2exPost(id:string) {

    const { data, error } = useSWR(url+id, fetcher)

    return {
        v2exPost: data,
        isV2exPostLoading: !error && !data,
        isV2exPostError: error,
    }
}