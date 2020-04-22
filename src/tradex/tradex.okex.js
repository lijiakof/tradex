const Okex = require('../core/okex');

module.exports = class Okex {
    constructor({ host, apiKey, secretKey, passPhrase }) {
        this.okex = new Okex(host, apiKey, secretKey, passPhrase);
    }

    getTicker(symbol) { }

    getBalance(currency) { }

    getBalances(currencies) { }

    buy({ symbol, amount, price }) { }

    sell({ symbol, amount, price }) { }

    getOrder(orderId, symbol) { }
}