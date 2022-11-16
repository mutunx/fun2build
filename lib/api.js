import {getPills, getLatestDiscuss, getLatestPill, getParser} from "./pills.js";
import {getFileText} from "./util.js";
import {addHours, differenceInHours, differenceInSeconds, formatDistance} from "date-fns";
import {parse as parseDate} from 'date-fns'
import {logger} from "./logger.js";


export  async function getPillsApi() {
    logger.info('- start create pills');
    logger.info('| 1. get config json object from file');
    const configText = getFileText('lib/config.json') ;
    let config = JSON.parse(configText);
    logger.info('| 2. get latest pill to check last call time');
    const pill = await getLatestPill();
    logger.info(`|-> latest pill ${pill ? 'exist':'not exist'},rec_date: ${JSON.stringify(pill['rec_date'])}`);
    // if (pill) {
    //     const recDate = parseDate(pill['rec_date'],'yyyy-MM-dd HH:mm:ss',new Date());
    //     const distance = differenceInHours(new Date(),recDate);
    //     const distanceString = formatDistance(new Date(),addHours(recDate,3),{includeSeconds:true});
    //     logger.info(`|-> latest call time: ${recDate}, distance: ${distance}, time left: ${distanceString}`);
    //     if (distance < 3) {
    //         return `The next available request will be in ${distanceString}`;
    //     }
    // }
    logger.info('| 3. create pills by config');
    for (let pillInfo of config) {
        const parser = getParser(pillInfo['belong'],pillInfo);
        logger.info(`|-> get pill from ${parser.name}`);
        const makeResult = await parser.makingPills();
    }

    return 'all finish';
}


