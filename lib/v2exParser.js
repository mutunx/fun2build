import {Parser} from "./parser.js";
import {textToRss, UrlHelp} from "./util.js";
import {format as formatDate} from "date-fns";
import path from "path";
import {logger} from "./logger.js";
import {web} from "./web.js";
import {prisma} from "./prisma.js";



export default class v2exParser extends Parser{

    constructor( config, prisma) {
        super('v2ex', config, prisma);
    }

    async createDiscussPill(url, commentUrl) {
        const response = await web.get(url);
        if (!response) return [];
        const rawContent = response.data;
        logger.info(`|-> get content from url, content length: ${rawContent.length}`);
        const rssItem = await textToRss(rawContent);
        const rawItems = rssItem.items;
        logger.info(`|-> content parser to rss content, rss items length: ${rawItems.length}`);
        const idsWhichNeedToGetComment = [];
        for (const rawItem of rawItems) {
            const {link} = rawItem;
            const pId = link.substring(link.lastIndexOf('/') + 1);
            logger.debug(`|-> get id ${pId} from ${link}`);
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
            logger.debug(`|-> pill pub_date: ${pill.pub_date} rec_date: ${pill.rec_date}`);
            await this.storagePill(pill);
        }

        for (const pId of idsWhichNeedToGetComment) {
            const url = commentUrl+'/'+pId;
            logger.debug(`|-> get comment from ${url}`);
            const response = await web.get(url);
            if (!response) continue;
            const rawContent = response.data;
            const rssItem = await textToRss(rawContent);
            const rawItems = rssItem.items;
            logger.debug(`|-> get comment ${rawItems.length} from pId:${pId}`);
            const comments = [];
            for (const rawItem of rawItems) {
                const matchReplyName = rawItem.content.matchAll(/<a.*?>(.*?)<\/a>/gm);
                logger.info(`|-> match reply `+[...matchReplyName].toString())
                let replyIds = [];
                let matchName = matchReplyName.next();
                while (!matchName.done) {
                    const replyName = matchName.value[1];
                    replyIds.push(replyName);
                    rawItem.content = rawItem.content.replaceAll(/<a.*>/gm,'');
                    matchName = matchReplyName.next();
                }
                const comment = {
                    id:rawItem.guid,
                    pill_id:pId,
                    author:rawItem.author,
                    pub_date:'',
                    rec_date:formatDate(new Date(),'yyyy-MM-dd HH:mm:ss'),
                    content:rawItem.content,
                    reply_ids:replyIds.join(','),
                    avatar:'',
                    vote:'-1',
                }
                logger.debug(`|-> save comment into database `);
                comments.push(comment);

                // 更新文章内容
                prisma.pill.update({
                    where: {
                        id:pId
                    },
                    data: {
                        content:rssItem.description,
                    }
                })
                logger.debug(`|-> update pill content  `);

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
