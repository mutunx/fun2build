import {database} from "./database.js";

export class Parser {
    name
    config
    prisma
    constructor(name,config,prisma) {
        this.name = name;
        this.config = config;
        this.prisma = prisma;
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

        const articleCount = await this.createArticlePill(article, allComment === '' ? articleComment : allComment);
        const discussCount = await this.createDiscussPill(discuss, allComment === '' ? discussComment : allComment);
        const pictureCount = await this.createPicturePill(picture, allComment === '' ? pictureComment : allComment);
        const videoCount = await this.createVideoPill(video, allComment === '' ? videoComment : allComment);
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
        const {prisma} = this;
        await prisma.pill.upsert({
            where: {id: pill.id},
            update: {},
            create: pill,
        });
    }
    async storageComments(comments) {
        const {prisma} = this;
        for (let comment of comments) {
            await prisma.comment.upsert({
                where: {id: comment.id},
                update: {},
                create: comment,
            })
        }
    }

    listPicture() {
        throw new Error("no implement");
    }

    listDiscuss() {
        throw new Error("no implement");
    }

    listArticle() {
        throw new Error("no implement");
    }

    listVideo() {
        throw new Error("no implement");
    }
}
