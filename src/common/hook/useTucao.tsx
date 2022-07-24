import useSWR, {  Fetcher } from 'swr'
import {tucao} from "../type";


const fetcher:Fetcher<tucao[],string> = (url) => fetch(url)
    .then(r=> r.json())
    .then(json => {
        if ('message' in json) return [];
        if (json['hot_tucao'] === null) return json['tucao'] as tucao[];
        return json['hot_tucao'] as tucao[];
    })
    .then(tucaoList => {
        if (tucaoList === []) return [];
        const beReplyCommentIds:number[] = [];
        tucaoList.forEach(tucao => {
            const matchReplyId = tucao.comment_content.match(/tucao-(\d*)/);
            if (matchReplyId && matchReplyId.length > 1) {
                const replyId = Number(matchReplyId[1]);
                beReplyCommentIds.push(replyId);
                tucao.comment_content = tucao.comment_content.replaceAll(/<a.*>/gm,'');
                tucao.comment_reply = tucaoList.find(x=> x.comment_ID === replyId) ?? null;
            }
        })
        tucaoList = tucaoList.filter(x=>!beReplyCommentIds.includes(x.comment_ID));
        return tucaoList;
    });


export function useTucao(id:string) {
    const { data, error } = useSWR(`https://worker.space4.fun${id}`, fetcher)

    return {
        tucao: data,
        isTucaoLoading: !error && !data,
        isTucaoError: error,
    }
}
