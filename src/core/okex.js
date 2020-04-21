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

    sign(data) {}

    async invoke() {}
}