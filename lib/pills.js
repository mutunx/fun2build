import {RSSHubParser} from "./RSSHubParser.js";
import _ from "lodash";
import {database} from "./database.js";

function getParser(name, config) {
    let parser;
    switch (name) {
        case "RSSHub":
            parser = new RSSHubParser(config);
            break;
        default:
            // throw new Error("wrong parser name");
    }
    return parser;
}

export default async function getLatestDiscuss() {
    const db = new database();
    return db.latestDiscuss();
}


export default async function getPills(config) {
    const parserKeys = Object.keys(config);

    const parsers = parserKeys.map(key => getParser(key, config[key]));

    const discuss = (await Promise.all(parsers.map(async p => await p.listDiscuss()))).flat();

    // let query = discuss.map(d => {
    //     const comments = d.comments;
    //     const sqls = [];
    //     delete d.comments;
    //     sqls.push(`INSERT INTO discuss (${Object.keys(d).join(',')}) VALUES ('${Object.values(d).join("','")}') ON CONFLICT (id) DO NOTHING;`);
    //     sqls.push(...comments.map(c=>`INSERT INTO comment (${Object.keys(c).join(',')}) VALUES ('${Object.values(c).join("','")}') ON CONFLICT (id) DO NOTHING; `))
    //     return sqls;
    // }).flat();

    // query = query.join('');
    const db = new database();
    // await db.update(query);
    try {

        discuss.map( async d => {
            const comments = d.comments;
            delete d.comments;
            const upsertDiscuss = await db.prisma.discuss.upsert({
                where: {id: d.id},
                update: {},
                create: d,
            });
            const upsertComment = await Promise.all(comments.map(async c => {
                await db.prisma.comment.upsert({
                    where: {id: c.id},
                    update: {},
                    create: c,
                })
            }));
        })
    } catch (e) {
        console.log(e);
    }
    return 'ok';



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

    const belongs = await db.prisma.discuss.findMany({
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
