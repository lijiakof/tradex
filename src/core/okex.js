const axios = require('axios');
const moment = require('moment');
const crypto = require('crypto');

module.exports = class Okex {
    constructor (host, accessKey, secretKey, passPhrase){
        this.host = host || 'https://www.okex.com';
        this.accessKey = accessKey;
        this.secretKey = secretKey;
        this.passPhrase = passPhrase;
    }

    sign(data) {

    }

    async invoke(method, path, data) {
        let headers = {
            'content-type': 'application/json; charset=utf-8',
            'OK-ACCESS-KEY': this.accessKey,
            'OK-ACCESS-PASSPHRASE': this.passPhrase,
        };

        if(method === 'POST') {

        }

        const resp = axios({
            method: method,
            url: url,
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
}