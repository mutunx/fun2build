import {Parser} from "./parser.js";
import {textToRss, UrlHelp} from "./util.js";
import {format as formatDate} from "date-fns";
import path from "path";



export default class v2exParser extends Parser{

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
                source: 'v2ex:热榜',
                pill_type: 'discuss',
                pill_belong: 'v2ex',
                source_link: rawItem.link,
                title: rawItem.title,
                id: pId.toString(),
                cover_url: '',
                description: rawItem.description,
                author: rawItem.author,
                link: rawItem.link,
                pub_date: formatDate(new Date(rawItem.pubDate),'yyyy-MM-dd HH:mm:ss'),
                rec_date: formatDate(new Date(rssItem.lastBuildDate),'yyyy-MM-dd HH:mm:ss'),
                content: rawItem.description,
            };
            await this.storagePill(pill);
        }

        for (const pId of idsWhichNeedToGetComment) {
            const url = path.join(commentUrl, pId);
            const rawContent = await UrlHelp.get(url);
            const rssItem = await textToRss(rawContent);
            const pillId = rssItem.link.substring(link.lastIndexOf('/') + 1);
            const rawItems = rssItem.items;
            console.log('v2ex post:',rawItems.length);
            const comments = [];
            for (const rawItem of rawItems) {
                const matchReplyName = rawItem.description.matchAll(/<a.*?>(.*?)<\/a>/gm);
                let replyIds = [];
                if (!matchReplyName.done) {
                    const replyName = matchReplyName.value[1];
                    replyIds.push(replyName);
                    rawItem.description = rawItem.description.replaceAll(/<a.*>/gm,'');
                }
                const comment = {
                    id:rawItem.guid,
                    pill_id:pillId.toString(),
                    author:rawItem.author,
                    pub_date:'',
                    rec_date:formatDate(new Date(),'yyyy-MM-dd HH:mm:ss'),
                    content:rawItem.description,
                    reply_ids:replyIds.join(','),
                    avatar:'',
                    vote:-1,
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



}