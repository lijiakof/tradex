const _ = require('lodash');
const Binance = require('../core/binance');

module.exports = class TradexBinance {
    constructor({ host, apiKey, apiSecret }) {
        this.host = host;
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    async getAccount() {}

    async getPrice(symbol) {}

    async buy({ symbol, amount, price }) { }

    async sell({ symbol, amount, price }) { }

    async getOrder(orderId, symbol) { }
}