import {queryDatabase} from "./util.js";
import pg from "pg";

const dbConfig = {
    host: process.env.DB_HOST,
    // Do not hard code your username and password.
    // Consider using Node environment variables.
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    ssl: false
};

export class database {
    client
    constructor() {
        this.client = new pg.Client(dbConfig);

    }
    connect() {
        this.client.connect(err => {
            if (err) throw err;
        });
    }

    async update(query) {
        try {
            this.connect();
            await this.client.query(query);
            return 'ok';
        } catch (e) {
            throw e;
        }

    }

    async query(query) {
        try {
            this.connect();
            const data = await this.client.query(query);
            return data.rows;
        } catch (e) {
            throw e;
        }
    }
}