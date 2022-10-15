export class Parser {
    name
    config
    constructor(name,config) {
        this.name = name;
        this.config = config;
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
