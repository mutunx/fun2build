import {RSSHubParser} from "./RSSHubParser.js";
import _ from "lodash";
import {database} from "./database.js";
import {PrismaClient} from "@prisma/client";
import {constFalse} from "prisma/prisma-client/generator-build/index.js";
import JandanParser from "./jandanParser.js";

function getParser(belong, info, prisma) {
    let parser;
    switch (belong) {
        case "RSSHub":
            parser = new RSSHubParser(info);
            break;
        case "jandan":
            parser = new JandanParser(belong,info,prisma);
        default:
            // throw new Error("wrong parser name");
    }
    return parser;
}

export async function getLatestDiscuss() {
    const db = new database();
    return db.latestDiscuss();
}


export async function getPills(config) {
    const prisma = new PrismaClient();

    const resultMsgList = [];
    for (let pillInfo of config) {
        const parser = getParser(pillInfo['belong'],pillInfo,prisma);
        const makeResult = await parser.makingPills();
        resultMsgList.push(makeResult);
    }

    return resultMsgList.join('\n');




}



export async function listPill(type, belong, options = {}) {
    const params = options;
    if (belong !== '') {
        options['pill_belong'] = belong;
    }


    const db = new database();
    const pills = await db.discuss(params);
    if (!_.isArray(pills)) return [];
    for (let pill of pills) {
        pill.comments = await db.comment(pill.id);
    }
    return pills;


}

export async function listPillBelongs(type, options = {}) {
    const params = options;
    params['pill_type'] = type;

    const db = new database();

    const belongs = await db.prisma.pill.findMany({
        where: params,
        select: {
            pill_belong: true,
        },
        distinct:['pill_belong']
    });

    return belongs.map(b => {return {
        params: {
          id:b['pill_belong']
        }
    }})

}
