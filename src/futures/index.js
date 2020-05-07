const Binance = require('./futures.binance');
const Huobi = require('./futures.huobi');
const Okex = require('./futures.okex');

module.exports = class Futures {

    /**
     * Create a futures
     * @typedef { Object } config
     * @property { string } id          - e.g., 'binance'
     * @property { string } host        - e.g., 'https://api.domain.com'
     * @property { string } apiKey      - e.g., 
     * @property { string } secretKey   - e.g.,
     * @property { string } passPhrase  - e.g.,
     */
    constructor({ id, host, apiKey, secretKey, passPhrase }) {

        const Klass = {
            binance: Binance,
            huobi: Huobi,
            okex: Okex
        };

        this.futures = new Klass[id]({
            host,
            apiKey,
            secretKey,
            passPhrase
        });
    }

    /**
     * Invoke api
     * @typedef { Object } config
     * @property { string } method  - e.g., 'GET'
     * @property { string } path    - e.g., '/api/path/'
     * @property { Object } data    - e.g., { symbol: 'btc-usdt', depth: 5 }
     * @returns { Promise<Object> }
     */
    invoke({ method, path, data }) {
        return this.futures.invoke(method, path, data);
    }

    /**
     * Get Depth by symbol
     * @typedef { Object } config
     * @property { string } symbol  - e.g., 'btc-usdt'
     * @property { number } depth   - e.g., 5, 10
     * @returns { Promise<Depths> }
     */
    getDepth({ symbol, depth=5 }) {
        return this.futures.getDepth({ symbol, depth });
    }

    /**
     * Get Ticker by symbol
     * @param { string } symbol - e.g.,'btc-usdt'
     * @returns { Promise<Ticker> }
     */
    getTicker(symbol) {
        return this.futures.getTicker(symbol);
    }

    /**
     * Get klines
     * @typedef { Object } config
     * @property { string } symbol  - e.g., 'btc-usdt'
     * @property { string } period  - e.g., '1min', '5min', '15min', '30min', '1hour', '4hour', '1day', '1week'
     * @property { number } limit   - e.g., 10
     * @returns { Promise<Klines> }
     */
    getKlines({ symbol, period, limit }) {
        return this.futures.getKlines({ symbol, period, limit });
    }

    setLeverage({ symbol, leverage }) {
        return this.futures.setLeverage({ symbol, leverage });
    }

    /**
     * Place an Order
     * @typedef { Object } order
     * @property { string } symbol          - e.g., 'btc-usdt'
     * @property { string } type            - e.g., 'openlong', 'openshort', 'closelong', 'closeshort'
     * @property { string|number } price    - e.g.,
     * @property { string|number } amount   - e.g., 
     */
    order({ symbol, type, price, amount }) {
        return this.futures.order({ symbol, type, price, amount });
    }

    cancelOrder({ orderId, symbol }) {
        return this.futures.order({ orderId, symbol });
    }

    getOrder({ orderId, symbol }) {
        return this.futures.getOrder({ orderId, symbol });
    }

    getOrders() {}
};