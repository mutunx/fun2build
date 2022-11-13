import {getPills, getLatestDiscuss, getLatestPill} from "./pills.js";
import {getFileText} from "./util.js";
import {addHours, differenceInHours, differenceInSeconds, formatDistance} from "date-fns";
import {parse as parseDate} from 'date-fns'


export  async function getPillsApi() {
    const configText = getFileText('lib/config.json') ;
    let config = JSON.parse(configText);
    const pill = await getLatestPill();
    if (pill) {
        const recDate = parseDate(pill['rec_date'],'yyyy-MM-dd HH:mm:ss',new Date());
        const distance = differenceInHours(new Date(),recDate);
        const distanceString = formatDistance(new Date(),addHours(recDate,3),{includeSeconds:true});
        if (distance < 3) {
            return `The next available request will be in ${distanceString}`;
        }
    }
    return await getPills(config);


}


