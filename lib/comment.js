import path from 'path';
import {UrlHelp} from "./util.js";
import {format as formatDate} from 'date-fns';
export async function getJandanComments(pId) {
    const commentBaseUrl = 'https://worker.space4.fun';

    const commentUrl = path.join(commentBaseUrl, pId);
    const comments = await UrlHelp.get(commentUrl);
    console.log(`get ${comments?.tucao.length ?? 0} comments`);
    return comments.tucao.map(c => {
        const matchReplyId = c.comment_content.match(/tucao-(\d*)/);
        let replyIds = [];
        if (matchReplyId && matchReplyId.length > 1) {
            replyIds.push(Number(matchReplyId[1]));
            c.comment_content = c.comment_content.replaceAll(/<a.*>/gm,'');
        }
        return {
            id:c.comment_ID.toString(),
            pill_id:c.comment_parent.toString(),
            author:c.comment_author,
            pub_date:formatDate(new Date(c.comment_date),'yyyy-MM-dd HH:mm:ss'),
            rec_date:formatDate(new Date(),'yyyy-MM-dd HH:mm:ss'),
            content:c.comment_content,
            reply_ids:replyIds.join(','),
            avatar:'',
            vote:c.vote_positive.toString(),
        }
    })
}
