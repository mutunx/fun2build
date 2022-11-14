import {PrismaClient} from "@prisma/client";
import JandanParser from "./jandanParser.js";
import v2exParser from "./v2exParser.js";

function getParser(belong, info, prisma) {
    let parser;
    switch (belong) {
        case "jandan":
            parser = new JandanParser(belong,info,prisma);
            break;
        case "v2ex":
            parser = new v2exParser(belong,info,prisma);
            break;
        default:
            // throw new Error("wrong parser name");
    }
    return parser;
}

export async function getLatestPill() {
    const prisma = new PrismaClient();
    return await prisma.pill.findFirst({
        orderBy: {
            rec_date: 'desc',
        },
    });
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
    if (belong !== '') {
        options['pill_belong'] = belong;
    }

    const prisma = new PrismaClient();

    const pills = await prisma.pill.findMany({
        orderBy: {
            pub_date: 'desc',
        },
        where: options
    });
    for (let pill of pills) {
        pill.comments = await prisma.comment.findMany({
            where: {
                pill_id: pill.id,
            }
        });
    }
    return pills;


}

export async function listPillBelongs(type, options = {}) {
    const params = options;
    params['pill_type'] = type;
    const prisma = new PrismaClient();

    const belongs = await prisma.pill.findMany({
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
