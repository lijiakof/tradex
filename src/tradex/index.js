const Spot = require('../spot');
const Futures = require('../futures');

/**
 * Tradex Class
 */
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

        this.spot = new Spot({
            id,
            host,
            apiKey,
            secretKey,
            passPhrase
        });

        this.futures = new Futures({
            id,
            host,
            apiKey,
            secretKey,
            passPhrase
        });
    }
};