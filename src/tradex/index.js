const Huobi = require('./tradex.huobi');
const Binance = require('./tradex.binance');
const Okex = require('./tradex.okex');

module.exports = class Tradex {

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

        this.tradex = new Klass[id]({
            host,
            apiKey,
            secretKey,
            passPhrase
        });
    }

    // getKlines({symbol, period, startTime, endTime}) { }

    /**
     * Get Depth by symbol
     * @typedef { Object } config
     * @property { string } symbol  - e.g., 'btc-usdt'
     * @property { number } depth   - e.g., 5, 10
     * @returns { Promise<Depth> } depth
     */
    getDepth({ symbol, depth=5 }) {
        return this.tradex.getDepth({ symbol, depth });
    }

    /**
     * Get Ticker by symbol
     * @param { string } symbol - e.g.,'btc-usdt'
     * @returns { Promise<Ticker> } tricker
     */
    getTicker(symbol) {
        return this.tradex.getTicker(symbol);
    }

    /**
     * Get Balance
     * @param { string } currency 
     * @returns { Promise<string|number> } banlance
     */
    getBalance(currency) {
        return this.tradex.getBalance(currency);
    }

    /**
     * Get Balances
     * @param { array } currencies 
     * @returns { Promise<object> } banlances
     */
    getBalances(currencies) {
        return this.tradex.getBalances(currencies);
    }

    /**
     * Maker buy order
     * @typedef { Object } order
     * @property { string } symbol  - e.g., 'btc-usdt'
     * @property { number } amount  - e.g., 0.1
     * @property { number } price   - e.g., 5000
     * @returns { Promise<string|number> } orderId
     */
    buy({ symbol, amount, price }) {
        return this.tradex.buy({ symbol, amount, price });
    }

    /**
     * Maker sell order
     * @typedef { Object } order
     * @property { string } symbol  - e.g., 'btc-usdt'
     * @property { number } amount  - e.g., 0.1
     * @property { number } price   - e.g., 10000
     * @returns { Promise<string|number> } orderId
     */
    sell({ symbol, amount, price }) { 
        return this.tradex.sell({ symbol, amount, price });
    }

    /**
     * Cancel the order by orderId
     * @typedef { Object } order
     * @property { number|string } orderId  - e.g., 2724352034
     * @property { string } symbol          - e.g., 'btc-usdt'
     */
    cancelOrder({ orderId, symbol }) {
        return this.tradex.cancelOrder({ orderId, symbol });
    }

    /**
     * Get Order by orderId
     * @param { string|number } orderId 
     * @param { string } symbol - e.g.,'btc-usdt'
     * @returns { Promise<Order> } order
     */
    getOrder(orderId, symbol) { 
        return this.tradex.getOrder(orderId, symbol);
    }

    /**
     * Get Orders
     * @typedef { Object } params
     * @property { string } symbol      - e.g., 'btc-usdt'
     * @property { number } startTime   - e.g., 1580601600000
     * @property { number } endTime     - e.g., 1582156800000
     * @property { number } limit       - e.g., 10
     * @returns { Promise<Orders> } orders
     */
    getOrders({ symbol, startTime, endTime, limit }) {
        return this.tradex.getOrders({ symbol, startTime, endTime, limit });
    }
};