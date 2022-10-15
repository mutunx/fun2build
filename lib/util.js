import axios from "axios";
import rssParser from 'rss-parser'

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

import pg from 'pg'
import {error} from "next/dist/build/output/log.js";



export async function queryTable(client, query) {


    try {
        const data = await client.query(query);
        return data.rows;
    } catch (e) {
        console.error(e);
    }
    // then(res => {
    //     console.log(res);
    //     const rows = res.rows;
    //
    //     process.exit();
    //     return rows;
    //
    // })
    //     .catch(err => console.log(err))
    //     .then(() => {
    //         console.log('Finished execution, exiting now');
    //         process.exit();
    //     });
}

export function queryDatabase(client,query) {


    client
        .query(query)
        .then(() => {
            console.log('Table created successfully!');
            client.end(console.log('Closed client connection'));
        })
        .catch(err => console.log(err))
        .then(() => {
            console.log('Finished execution, exiting now');
            process.exit();
        });
}
