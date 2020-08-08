import config from '../../config';
import axios from 'axios';
import auth from './auth';

/**
* @param {String} action
* @param {Object} data
* @param {Function} cb
*/

async function api(action, data, cb) {
    try {
        let {method, url, isJWT} = middlewares[action];
        let headers;
        if (method === 'get' && action !== 'current'){
            url += objToGet(data);
            data = false;
        }
        if (action === 'current') {
            url = data.url;
        }
        if (isJWT) {
            headers = { Authorization: 'Token ' + auth.tokens.access };
        }
        url = config.domain + '/api/v1/' + url;
        // console.log('>>', url);
        axios({ url, method, data, headers}).then(res => {
        // console.log(action, res.status, res);
            res.success = true;
            cb(res);
        }).catch(e => {
            console.log('Api error', action, '<', e);
            cb({success: false});
        });
    } catch (e) {
        console.log('Api error:', e);
        cb({success: false});
    }
};

const middlewares = {
    registration: {url: 'user/registration/', method: 'post'},
    login: { url: 'user/login/', method: 'post'},
    createOrder: {url: 'order/create', method: 'post', isJWT: true},
    ordersHistory: {url: 'user/orders', method: 'get', isJWT: true},
    // Public
    curencyes: {url: 'cashe/currencies', method: 'get'},
    tikers: {url: 'exchange.xml', method: 'get'},
    current: { method: 'get' }
};

export default api;

const objToGet = obj => Object.keys(obj).reduce((s, k) => s + k + '=' + obj[k] + '&', '?');
