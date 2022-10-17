import {RSSHubParser} from "./RSSHubParser.js";
import pg from "pg";
import {queryDatabase, queryTable} from "./util.js";
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

export default async function getPills(config) {
    const parserKeys = Object.keys(config);

    const parsers = parserKeys.map(key => getParser(key, config[key]));

    const discuss = (await Promise.all(parsers.map(async p => await p.listDiscuss()))).flat();

    let query = discuss.map(d => {
        const comments = d.comments;
        const sqls = [];
        delete d.comments;
        sqls.push(`INSERT INTO discuss (${Object.keys(d).join(',')}) VALUES ('${Object.values(d).join("','")}') ON CONFLICT (id) DO NOTHING;`);
        sqls.push(...comments.map(c=>`INSERT INTO comment (${Object.keys(c).join(',')}) VALUES ('${Object.values(c).join("','")}') ON CONFLICT (id) DO NOTHING; `))
        return sqls;
    }).flat();

    query = query.join('');
    const db = new database();
    await db.update(query);

}

export async function listPill(type, belong, options = {}) {
    const params = ['1=1'];
    if (belong !== '') {
        options.push({'pill_belong': belong})
    }
    if (options && options !== {}) {
        const keys = Object.keys(options);
        for (let key of keys) {
            const value = options[key];
            let valInQuery = value;
            if (_.isArray(value)) {
                valInQuery = `'${value.join(',')}'`;
            }
            if (_.isString(value)) {
                valInQuery = `'${value}'`;
            }
            params.push(`${key} = ${valInQuery}`);
        }
    }

    const query = `SELECT * FROM discuss WHERE pill_type = '${type}' and ${params.join(' and ')};`;
    const db = new database();
    const pills = db.query(query);
    console.log(pills)
    if (!_.isArray(pills)) return [];
    for (let pill of pills) {
        const commentQuery = `SELECT * FROM comment WHERE pill_id = '${pill.id}'`;
        pill.comments = await db.query(commentQuery);
    }
    return pills;


}
