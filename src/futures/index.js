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

    /**
     * Get Depth by symbol
     * @typedef { Object } config
     * @property { string } symbol  - e.g., 'btc-usdt'
     * @property { number } depth   - e.g., 5, 10
     * @returns { Promise<Depth> }
     */
    getDepth({ symbol, depth=5 }) {
        return this.spot.getDepth({ symbol, depth });
    }

    order() {
        return this.futures.order();
    }
    
};