import useSWR, { Key, Fetcher } from 'swr'
import Parser from "rss-parser";
import {tucao} from "../type";


const fetcher:Fetcher<tucao[],string> = (url) => fetch(url)
    .then(r=>r.json())


export function useTucao(id:string) {
    const { data, error } = useSWR(`https://tucao.space4fun.workers.dev${id}`, fetcher)

    return {
        tucao: data,
        isTucaoLoading: !error && !data,
        isTucaoError: error,
    }
}