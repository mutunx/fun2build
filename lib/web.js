import axios from "axios";
import {logger} from "./logger.js";
import _ from "lodash";

function beforeRequest(config) {
    const method = config.method;
    let displayKeys = [];
    switch (method.toLowerCase()) {
        case 'get':
            displayKeys = _.pick(config,['url','method','baseURL','params']);
            break;
        case 'post':
            displayKeys = _.pick(config,['url','method','baseURL','data']);
            break;
    }
    logger.info(':: web request -> ', displayKeys);
    return config;
}

function requestFail(error) {
    logger.error(':: web request error -> '+error.toJSON() );
    return error;
}

// 2XX
function responseSuccess(response) {
    logger.info(':: web response success -> ', _.pick(response,['status','statusText']) );
    return response;
}

// exclude 2XX
function responseError(error) {
    if (error.response) {
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        logger.error('::- web response error -> request success but status not in 2XX');
        logger.error("::| status: "+error.response.status);
        logger.error("::- headers",error.response.headers);
    } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        logger.error('::- web response error -> request success but no response');
    } else {
        // 发送请求时出了点问题
        logger.error('::- web response error -> request error: '+ error.message,);
    }
    return error;
}


export const web = axios.create();
web.interceptors.request.use(beforeRequest,requestFail);
web.interceptors.response.use(responseSuccess,responseError);

