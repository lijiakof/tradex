const axios = require('axios');
const moment = require('moment');
const { cryptor, querystring } = require('./core');

module.exports = class Binance {
    constructor(host, apiKey, secretKey) {
        this.id = 'binance';
        this.host = host || 'https://api.binance.com';
        this.apiKey = apiKey;
        this.secretKey = secretKey;
    }

    sign(data) {
        const query = querystring.stringify(data);
        const signature = cryptor.hmac(query, this.secretKey, 'sha256', 'hex');

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
            params: (method === 'GET' || method === 'DELETE') ? data : null,
            data: method === 'POST' ? querystring.stringify(data) : null
        }).then(res => {
            return res.data;
        }, err => {
            console.log(`${moment.utc().format('YYYY-MM-DDTHH:mm:ss')} error: ${path}`);
            console.error(err);

            throw err;
        });

        return resp;
    }
};