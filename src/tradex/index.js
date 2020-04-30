const Binance = require('../core/binance');
const Huobi = require('../core/huobi');
const Okex = require('../core/okex');

const Spot = require('../spot');
const Futures = require('../futures');

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

        this._api = new Klass[id](host, apiKey, secretKey, passPhrase);

        this.spot = new Spot(this._api);
        this.futures = new Futures(this._api);
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
        return this._api.invoke(method, path, data);
    }
};