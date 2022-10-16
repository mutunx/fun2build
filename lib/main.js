import getPills from "./pills.js";
import fs from 'fs';
import path from 'path';


export default async function main() {
    const configPath = path.join(process.cwd(), 'config.json');

    let rawConfig = fs.readFileSync(configPath);
    let config = JSON.parse(rawConfig);

    await getPills(config);

}
