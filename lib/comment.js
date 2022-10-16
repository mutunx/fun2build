import path from 'path';
import {UrlHelp} from "./util.js";

export async function getJandanComments(pId) {
    const commentBaseUrl = 'https://worker.space4.fun';

    const commentUrl = path.join(commentBaseUrl, pId);
    const comments = await UrlHelp.get(commentUrl);
    return comments.tucao.map(c => {
        const matchReplyId = c.comment_content.match(/tucao-(\d*)/);
        let replyIds = [];
        if (matchReplyId && matchReplyId.length > 1) {
            replyIds.push(Number(matchReplyId[1]));
            c.comment_content = c.comment_content.replaceAll(/<a.*>/gm,'');
        }
        return {
            id:c.comment_ID,
            pill_id:c.comment_parent,
            author:c.comment_author,
            pub_date:c.comment_date,
            rec_date:new Date().toString(),
            content:c.comment_content,
            reply_ids:replyIds,
            avatar:'',
            vote:c.vote_positive,
        }
    })
}
