import JandanParser from "./jandanParser.js";
import v2exParser from "./v2exParser.js";
import {prisma} from "./prisma.js";
import {logger} from "./logger.js";

export function getParser(belong, info) {
    let parser;
    switch (belong) {
        case "jandan":
            parser = new JandanParser(info);
            break;
        case "v2ex":
            parser = new v2exParser(info);
            break;
        default:
            // throw new Error("wrong parser name");
    }
    return parser;
}

export async function getLatestPill() {
    return await prisma.pill.findFirst({
        orderBy: {
            rec_date: 'desc',
        },
    });
}






export async function listPill(type, belong, options = {}) {
    if (belong !== '') {
        options['pill_belong'] = belong;
    }
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
    return pills.filter(p => p.comments.length > 0);


}

export async function listPillBelongs(type, options = {}) {
    const params = options;
    params['pill_type'] = type;

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
