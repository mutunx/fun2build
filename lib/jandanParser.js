import {Parser} from "./parser.js";
import {textToRss, UrlHelp} from "./util.js";
import {getJandanComments} from "./comment.js";
import {format as formatDate} from "date-fns";
import path from "path";



export default class JandanParser extends Parser{


    constructor(name, config, prisma) {
        super(name, config, prisma);
    }

    async createDiscussPill(url, commentUrl) {
        const rawContent = await UrlHelp.get(url);
        const rssItem = await textToRss(rawContent);
        const rawItems = rssItem.items;
        const idsWhichNeedToGetComment = [];
        for (const rawItem of rawItems) {
            const {link} = rawItem;
            const pId = link.substring(link.lastIndexOf('/') + 1);
            idsWhichNeedToGetComment.push(pId);
            const pill = {
                source: '煎蛋:热榜',
                pill_type: 'discuss',
                pill_belong: 'jandan',
                source_link: rawItem.link,
                title: '',
                id: pId.toString(),
                cover_url: '',
                description: '',
                author: rawItem.author,
                link: rawItem.link,
                pub_date: formatDate(new Date(rawItem.pubDate),'yyyy-MM-dd HH:mm:ss'),
                rec_date: formatDate(new Date(rssItem.lastBuildDate),'yyyy-MM-dd HH:mm:ss'),
                content: rawItem.content.match(/<p[\w\W]*?\/p>/mg)[0].replaceAll('<p>','').replaceAll('</p>',''),
            };
            this.storagePill(pill);
        }

        for (const pId of idsWhichNeedToGetComment) {
            const url = path.join(commentUrl, pId);
            const rawComments = await UrlHelp.get(url);
            const tucaoList = rawComments['tucao'] ?? [];
            console.log(tucaoList.length);
            const comments = [];
            for (const tucao of tucaoList) {
                const matchReplyId = tucao.comment_content.match(/tucao-(\d*)/);
                let replyIds = [];
                if (matchReplyId && matchReplyId.length > 1) {
                    replyIds.push(Number(matchReplyId[1]));
                    tucao.comment_content = tucao.comment_content.replaceAll(/<a.*>/gm,'');
                }
                const comment = {
                    id:tucao.comment_ID.toString(),
                    pill_id:tucao.comment_parent.toString(),
                    author:tucao.comment_author,
                    pub_date:formatDate(new Date(tucao.comment_date),'yyyy-MM-dd HH:mm:ss'),
                    rec_date:formatDate(new Date(),'yyyy-MM-dd HH:mm:ss'),
                    content:tucao.comment_content,
                    reply_ids:replyIds.join(','),
                    avatar:'',
                    vote:tucao.vote_positive.toString(),
                }
                comments.push(comment);

            }

            await this.storageComments(comments);
        }

        return idsWhichNeedToGetComment.length;
    }

    async createPicturePill(url, commentUrl) {
        return super.createPicturePill(url, commentUrl);
    }

    async createVideoPill(url, commentUrl) {
        return super.createVideoPill(url, commentUrl);
    }

    async createArticlePill(url, commentUrl) {
        return super.createArticlePill(url, commentUrl);
    }

    storagePill(pills) {
        super.storagePill(pills);
    }

}