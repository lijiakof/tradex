const Huobi = require('./tradex.huobi');
const Binance = require('./tradex.binance');
const Okex = require('./tradex.okex');

module.exports = class Tradex {
    constructor({ id, host, accessKey, secretKey, apiKey, apiSecret }) {

        const Klass = {
            huobi: Huobi,
            binance: Binance,
            okex: Okex
        };

        this.tradex = new Klass[id]({
            host,
            // for Binance
            apiKey,
            apiSecret,
            // for Huobi
            accessKey,
            secretKey
        });
    }

    initAccount() {
        return this.tradex.initAccount();
    }

    getTicker(symbol) {
        return this.tradex.getTicker(symbol);
    }

    getBalance(currency) {
        return this.tradex.getBalance(currency);
    }

    getBalances(currencies) {
        return this.tradex.getBalances(currencies);
    }

    buy({ symbol, amount, price }) {
        return this.tradex.buy({ symbol, amount, price });
    }

    sell({ symbol, amount, price }) { 
        return this.tradex.sell({ symbol, amount, price });
    }

    getOrder(orderId, symbol) { 
        return this.tradex.getOrder(orderId, symbol);
    }
}