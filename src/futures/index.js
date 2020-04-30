const Binance = require('./futures.binance');
const Huobi = require('./futures.huobi');
const Okex = require('./futures.okex');

module.exports = class Futures {

    /**
     * Create a futures
     * @param { Object } api
     */
    constructor(api) {

        const Klass = {
            binance: Binance,
            huobi: Huobi,
            okex: Okex
        };

        this.futures = new Klass[api.id](api);
    }

    order() {
        return this.futures.order();
    }
    
};