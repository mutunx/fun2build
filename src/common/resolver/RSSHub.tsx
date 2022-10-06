import {Resolver} from "../entities/Resolver";
import {content, juConfig} from "../entities/types";

export class RSSHub extends Resolver {

    async listVideo(config: juConfig): Promise<content[]> {
        const follows = config.video.followed;
        const contents = [];
        for (let follow of follows) {
            const url = follow.url;
            const response = await fetch(url);
            const responseOK = response && response.ok;
            if (responseOK) {
                let data = await response.json();
                debugger;
            }
        }
        return [];
    }


}