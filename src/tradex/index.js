const Huobi = require('./tradex.huobi');
const Binance = require('./tradex.binance');
const Okex = require('./tradex.okex');

module.exports = class Tradex {
    constructor({ type }) {

        const Klass = {
            huobi: Huobi,
            binance: Binance,
            okex: Okex
        };

        this.trader = new Klass[type]();
    }

    getPrice(symbol) {
        return this.trader.getPrice(symbol);
    }
}