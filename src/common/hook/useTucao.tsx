import useSWR, {  Fetcher } from 'swr'
import {tucao} from "../type";


const fetcher:Fetcher<tucao[],string> = (url) => fetch(url)
    .then(r=> r.json()).then(json => {
        if ('message' in json) return [];
        if (json['hot_tucao'] === null) return json['tucao'];
        return json['hot_tucao'];
    })


export function useTucao(id:string) {
    const { data, error } = useSWR(`https://tucao.space4fun.workers.dev${id}`, fetcher)

    return {
        tucao: data,
        isTucaoLoading: !error && !data,
        isTucaoError: error,
    }
}
