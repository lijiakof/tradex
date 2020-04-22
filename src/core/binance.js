const axios = require('axios');
const moment = require('moment');
const querystring = require('querystring');
const core = require('./core');

module.exports = class Binance {
    constructor(host, apiKey, apiSecret) {
        this.host = host || 'https://api.binance.com';
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    sign(data) {
        const query = querystring.encode(data);
        const signature = core.hmac(query, this.apiSecret, 'sha256', 'hex');

        return signature;
    }

    async invoke(method, path, data = {}, authType=true) {
        let headers = {};

        if(authType) {
            data.timestamp = Date.now();
            data.signature = this.sign(data);

            headers = {
                'X-MBX-APIKEY': this.apiKey
            };
        }

        const resp = await axios({
            method: method,
            url: `${this.host}${path}`,
            headers,
            timeout: 34000,
            params: method === 'GET' ? data : null,
            data: method === 'POST' ? querystring.encode(data) : null
        }).then(res => {
            return res.data;
        }, err => {
            console.log(`${moment.utc().format('YYYY-MM-DDTHH:mm:ss')} error: ${path}`);
            console.error(err)

            throw err;
        });

        return resp;
    }
}