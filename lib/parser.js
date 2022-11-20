import {prisma} from "./prisma.js";
import {logger} from "./logger.js";

export class Parser {
    name
    config
    constructor(name,config) {
        this.name = name;
        this.config = config;
    }

    async makingPills() {
        const {config} = this;
        if (typeof config !== 'object' || !('pill' in config)) return;
        const {article,discuss,video,picture} = config['pill'];
        const {
            article : articleComment,
            discuss : discussComment,
            video : videoComment,
            picture : pictureComment,
            all : allComment
        } = config['comment'];
        logger.info(`|-> get article pill from ${this.name}, is use all comment url: ${allComment === ''.toString()}`);
        const articleCount = await this.createArticlePill(article, allComment === '' ? articleComment : allComment);
        logger.info(`|-> get article finish, total: ${articleCount}`);
        logger.info(`|-> get discuss pill from ${this.name}, is use all comment url: ${allComment === ''.toString()}`);
        const discussCount = await this.createDiscussPill(discuss, allComment === '' ? discussComment : allComment);
        logger.info(`|-> get discuss finish, total: ${discussCount}`);
        logger.info(`|-> get video pill from ${this.name}, is use all comment url: ${allComment === ''.toString()}`);
        const videoCount = await this.createVideoPill(video, allComment === '' ? videoComment : allComment);
        logger.info(`|-> get video finish, total: ${videoCount}`);
        logger.info(`|-> get picture pill from ${this.name}, is use all comment url: ${allComment === ''.toString()}`);
        const pictureCount = await this.createPicturePill(picture, allComment === '' ? pictureComment : allComment);
        logger.info(`|-> get picture finish, total: ${pictureCount}`);
        return `make pills of ${config['belong']} article:${articleCount } discuss:${discussCount} picture:${pictureCount} video:${videoCount}`;
    }
    async createDiscussPill(url,commentUrl) {
        return 0;
    }
    async createPicturePill(url,commentUrl) {
        return 0;
    }
    async createVideoPill(url,commentUrl) {
        return 0;
    }
    async createArticlePill(url,commentUrl) {
        return 0;
    }
    async storagePill(pill) {
        await prisma.pill.upsert({
            where: {id: pill.id},
            update: {},
            create: pill,
        });
    }
    async storageComments(comments) {
        for (let comment of comments) {
            await prisma.comment.upsert({
                where: {id: comment.id},
                update: {},
                create: comment,
            })
        }
    }


}
