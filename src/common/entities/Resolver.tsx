import {content, juConfig} from "./types";

export class Resolver {
    name:string

    constructor(name:string) {
        this.name = name;
    }

    listVideo(config:juConfig):Promise<content[]> {
        throw new Error("no implement")
    }
    listArticle(config:juConfig):Promise<content[]> {
        throw new Error("no implement")
    }
    listDiscussion(config:juConfig):Promise<content[]> {
        throw new Error("no implement")
    }
    listPicture(config:juConfig):Promise<content[]> {
        throw new Error("no implement")
    }
}