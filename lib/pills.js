import {RSSHubParser} from "./RSSHubParser.js";
import pg from "pg";
import {queryDatabase, queryTable} from "./util.js";
import _ from "lodash";


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

    console.log(discuss);

    const dbConfig = {
        host: '127.0.0.1',
        // Do not hard code your username and password.
        // Consider using Node environment variables.
        user: 'postgres',
        password: '123',
        database: 'PillBox',
        port: 5432,
        ssl: false
    };
    const client = new pg.Client(dbConfig);
    let query = discuss.map(d => {
        const comments = d.comments;
        const sqls = [];
        delete d.comments;
        sqls.push(`INSERT INTO discuss (${Object.keys(d).join(',')}) VALUES ('${Object.values(d).join("','")}') ON CONFLICT (id) DO NOTHING;`);
        console.log(comments)
        sqls.push(...comments.map(c=>`INSERT INTO comment (${Object.keys(c).join(',')}) VALUES ('${Object.values(c).join("','")}') ON CONFLICT (id) DO NOTHING; `))
        return sqls;
    }).flat();

    query = query.join('');

    client.connect(err => {
        if (err) throw err;
        else {
            queryDatabase(client,query);
        }
    });
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

    const dbConfig = {
        host: '127.0.0.1',
        // Do not hard code your username and password.
        // Consider using Node environment variables.
        user: 'postgres',
        password: '123',
        database: 'PillBox',
        port: 5432,
        ssl: false
    };
    console.log(query);
    const client = new pg.Client(dbConfig);
    try {
        client.connect(err => {
            if (err) throw err;
        });

        const pills = await queryTable(client, query);
        for (let pill of pills) {
            const commentQuery = `SELECT * FROM comment WHERE pill_id = '${pill.id}'`;
            pill.comments = await queryTable(client, commentQuery);
            console.log(pill,commentQuery)
        }
        return pills;
    } catch (e) {
        return [];
    }
}
