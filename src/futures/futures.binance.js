const Binance = require('../core/binance');

module.exports = class FuturesBinance {
    constructor(binance = new Binance()) {
        this.binance = binance;
    }

    async order() {
        console.log('binance futures order');
    }
};