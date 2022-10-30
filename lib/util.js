import axios from "axios";
import rssParser from 'rss-parser'
import fs from 'fs';
import path from 'path';
export async function textToRss(text) {
    const parser = new rssParser();
    return await parser.parseString(text);
}

export class UrlHelp {

    static async get(url) {
        const response = await axios({
            url: url,
            method: 'get',
        });
        return response.data;
    }

}


export function getFileText(paths) {
    const configPath = path.join(process.cwd(), paths);

    return  fs.readFileSync(configPath);
}