const axios = require('axios');
const { cryptor, querystring } = require('./core');

module.exports = class Okex {
    constructor (host, accessKey, secretKey, passPhrase){
        this.id = 'okex';
        this.host = host || 'https://www.okex.com';
        this.accessKey = accessKey;
        this.secretKey = secretKey;
        this.passPhrase = passPhrase;
    }

    sign({ method, path, data, timestamp }) {
        let signPath = path;
        let signData = data;

        if(method === 'POST') {
            signData = JSON.stringify(data);
        }
        else if(method === 'GET') {
            signPath = path + (data ? '?' : '') + querystring.stringify(data);
            signData = '';
        }

        const str = timestamp + method.toUpperCase() + signPath + signData;
        const signature = cryptor.hmac(str, this.secretKey, 'sha256', 'base64');

        return signature;
    }

    async invoke(method, path, data) {
        const timestamp = Date.now() / 1000;

        let headers = {
            'content-type': 'application/json; charset=utf-8',
            'OK-ACCESS-KEY': this.accessKey,
            'OK-ACCESS-PASSPHRASE': this.passPhrase,
            'OK-ACCESS-SIGN': this.sign({method, path, data, timestamp}),
            'OK-ACCESS-TIMESTAMP': timestamp
        };

        const url = `${this.host}${path}`;

        const resp = axios({
            method: method,
            url,
            headers,
            timeout: 34000,
            params: method === 'GET' ? data : null,
            data: method === 'POST' ? data : null
        }).then(res => {
            return res.data;
        }, err => {
            console.log(err.response && err.response !== undefined && err.response.data
                ? JSON.stringify(err.response.data)
                : err);
            console.log(err.message ? err.message : `${url} error`);
            throw err;
        });

        return resp;
    }
};