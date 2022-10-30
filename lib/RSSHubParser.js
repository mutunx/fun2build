import {Parser} from "./parser.js";
import {textToRss,UrlHelp} from "./util.js";
import {getJandanComments} from "./comment.js";
import {format as formatDate} from 'date-fns'


export class RSSHubParser extends Parser {

    constructor(config) {
        super("RSSHub",config);
    }

    async listDiscuss() {
        const {config} = this;
        const discuss = config.discuss;
        const followed = discuss.followed;
        const pills = [];
        // for (let follow of followed) {
        //     const url = follow.url;
        //     const rawContent = await UrlHelp.get(url);
        //     const items = await textToRss(rawContent);
        //     console.log(`get ${items?.items.length ?? 0} discuss`);
        //     const discuss = await createPills(items,follow.source,'discuss');
        //     pills.push(...discuss);
        // }
        return pills;
    }
}
async function createPills(rssItem, source, itemType) {
    const siteParser = {
        "discuss:jandan": async (rssItem) => {
            const pills =  rssItem.items.map(async item => {
                const pId = item.link.substr(item.link.lastIndexOf('/') + 1);
                const comments = await getJandanComments(pId);
                return {
                    source: '煎蛋:热榜',
                    pill_type: 'discuss',
                    pill_belong: 'jandan',
                    source_link: rssItem.link,
                    title: '',
                    id: pId.toString(),
                    cover_url: '',
                    description: '',
                    author: item.author,
                    link: item.link,
                    pub_date: formatDate(new Date(item.pubDate),'yyyy-MM-dd HH:mm:ss'),
                    rec_date: formatDate(new Date(rssItem.lastBuildDate),'yyyy-MM-dd HH:mm:ss'),
                    content: item.content.match(/<p[\w\W]*?\/p>/mg)[0].replaceAll('<p>','').replaceAll('</p>',''),
                    comments: comments,
                }
            });
            return await Promise.all(pills);
        },
        'discuss:v2ex': () => [],
    }
    return await siteParser[`${itemType}:${source}`]?.(rssItem);
}
