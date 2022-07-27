import useSWR, { Key, Fetcher } from 'swr'
import Parser from "rss-parser";
import {rssItem} from "../type";


const url: Key = "https://spac4fun.herokuapp.com/v2ex/topics/"
const fetcher:Fetcher<rssItem[],string> = (url) => fetch(url)
        .then(r=>r.text())
        .then(text => new Parser().parseString(text))
        .then(feed => feed.items as rssItem[])
    .then(rssItems => {
        console.log(rssItems)
        rssItems.forEach(item => item.content = item.content.replace(`${item.author}: `,''))
        return rssItems;
    })

export function useV2ex(type:string) {

    const { data, error } = useSWR(url+type, fetcher)

    return {
        v2ex: data,
        isV2exLoading: !error && !data,
        isV2exError: error,
    }
}