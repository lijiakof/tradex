const Huobi = require('./tradex.huobi');
const Binance = require('./tradex.binance');
const Okex = require('./tradex.okex');

module.exports = class Tradex {
    constructor({ type, host }) {

        const Klass = {
            huobi: Huobi,
            binance: Binance,
            okex: Okex
        };

        this.tradex = new Klass[type]({
            host,
        });
    }

    getPrice(symbol) {
        return this.tradex.getPrice(symbol);
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