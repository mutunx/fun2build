import main from "../../lib/main.js";

export default async function handler(req, res) {
    try {
        main().then(b =>res.status(200).json({text: 'ok'}));

    } catch (e) {
        res.status(500).json({text: e.toString()});
    }
}
