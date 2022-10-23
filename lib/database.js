import {queryDatabase} from "./util.js";
import pg from "pg";
import { PrismaClient } from '@prisma/client'


const dbConfig = {
    host: '',
    // Do not hard code your username and password.
    // Consider using Node environment variables.
    user: '',
    password: '',
    database: '',
    port: '',
    ssl: false
};

export class database {
    client
    prisma
    constructor() {
        // this.client = new pg.Client(dbConfig);
        this.prisma = new PrismaClient();
    }
    connect() {
        this.client.connect(err => {
            if (err) throw err;
        });
    }

    async discuss(option = {}) {
        const {prisma} = this;
        return await prisma.discuss.findMany({
            where: option
        });
    }
    async comment(pill_Id,option = {}) {
        const {prisma} = this;
        return await prisma.comment.findMany({
            where: {
                pill_id: pill_Id,
                ...option
            }
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