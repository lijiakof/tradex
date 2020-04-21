const axios = require('axios');
const moment = require('moment');
const crypto = require('crypto');

module.exports = class Binance {
    constructor(host, apiKey, apiSecret) {
        this.host = host || 'https://api.binance.com';
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    sign(data) {}

    async invoke() {}
}