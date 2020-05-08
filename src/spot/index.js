const Huobi = require('./spot.huobi');
const Binance = require('./spot.binance');
const Okex = require('./spot.okex');

module.exports = class Spot {

    /**
     * Create a tradex
     * @typedef { Object } config
     * @property { string } id          - e.g., 'binance'
     * @property { string } host        - e.g., 'https://api.domain.com'
     * @property { string } apiKey      - e.g., 
     * @property { string } secretKey   - e.g.,
     * @property { string } passPhrase  - e.g.,
     */
    constructor({ id, host, apiKey, secretKey, passPhrase }) {

        const Klass = {
            huobi: Huobi,
            binance: Binance,
            okex: Okex
        };

        this.spot = new Klass[id]({
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
        return this.spot.invoke(method, path, data);
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

    /**
     * Get Ticker by symbol
     * @param { string } symbol - e.g.,'btc-usdt'
     * @returns { Promise<Ticker> }
     */
    getTicker(symbol) {
        return this.spot.getTicker(symbol);
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
        return this.spot.getKlines({ symbol, period, limit });
    }

    /**
     * Get Balance
     * @param { string } currency 
     * @returns { Promise<string|number> }
     */
    getBalance(currency) {
        return this.spot.getBalance(currency);
    }

    /**
     * Get Balances
     * @param { array } currencies 
     * @returns { Promise<object> }
     */
    getBalances(currencies) {
        return this.spot.getBalances(currencies);
    }

    /**
     * Maker buy order
     * @typedef { Object } order
     * @property { string } symbol  - e.g., 'btc-usdt'
     * @property { number } amount  - e.g., 0.1
     * @property { number } price   - e.g., 5000
     * @returns { Promise<string|number> }
     */
    buy({ symbol, amount, price }) {
        return this.spot.buy({ symbol, amount, price });
    }

    /**
     * Maker sell order
     * @typedef { Object } order
     * @property { string } symbol  - e.g., 'btc-usdt'
     * @property { number } amount  - e.g., 0.1
     * @property { number } price   - e.g., 10000
     * @returns { Promise<string|number> }
     */
    sell({ symbol, amount, price }) { 
        return this.spot.sell({ symbol, amount, price });
    }

    /**
     * Cancel an order by orderId
     * @typedef { Object } order
     * @property { number|string } orderId  - e.g., 2724352034
     * @property { string } symbol          - e.g., 'btc-usdt'
     * @returns { Promise<string|number> }
     */
    cancelOrder({ orderId, symbol }) {
        return this.spot.cancelOrder({ orderId, symbol });
    }

    /**
     * Get an order by orderId
     * @param { string|number } orderId 
     * @param { string } symbol - e.g.,'btc-usdt'
     * @returns { Promise<Order> }
     */
    getOrder({ orderId, symbol }) { 
        return this.spot.getOrder({ orderId, symbol });
    }

    /**
     * Get orders
     * @typedef { Object } params
     * @property { string } symbol      - e.g., 'btc-usdt'
     * @property { number } startTime   - e.g., 1580601600000
     * @property { number } endTime     - e.g., 1582156800000
     * @property { number } limit       - e.g., 10
     * @returns { Promise<Orders> }
     */
    getOrders({ symbol, startTime, endTime, limit }) {
        return this.spot.getOrders({ symbol, startTime, endTime, limit });
    }
};