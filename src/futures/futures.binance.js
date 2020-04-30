const Binance = require('../core/binance');
const Filters = require('../filters/filters.binance');

module.exports = class FuturesBinance {
    constructor(binance = new Binance()) {
        this.binance = binance;
    }

    async getDepth({ symbol, depth }) {
        const res = await this.binance.invoke('GET', '/fapi/v1/depth', {
            symbol: Filters.revertSymbol(symbol),
            limit: depth
        }, false);

        return res;
    }

    async order() {
        console.log('binance futures order');
    }
};