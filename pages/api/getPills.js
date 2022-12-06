import {getPillsApi} from "../../lib/api.js";

export default async function handler(req, res) {
    try {
        const msg = await getPillsApi();
        res.status(200).json({text: msg});
    } catch (e) {
        res.status(500).json(e);
    }
}
