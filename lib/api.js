import getPills from "./pills.js";
import {getFileText} from "./util.js";



export  async function getPillsApi() {
    const configText = getFileText('lib/config.json');
    let config = JSON.parse(configText);

    await getPills(config);

}

export  async function listPillsApi() {


}
