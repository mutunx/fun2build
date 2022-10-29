import getPills from "./pills.js";
import {getFileText} from "./util.js";
import getLatestDiscuss from "./pills.js";



export  async function getPillsApi() {
    const configText = getFileText('lib/config.json');
    let config = JSON.parse(configText);
    // 3 hour
    const discuss = await getLatestDiscuss();
    const revDate = discuss['rec_date'];

    return await getPills(config);

}

export  async function listPillsApi() {


}
