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

    // 24 hour rolling window price change statistics.
    async getTicker(symbol) {
        const res = await this.binance.invoke('GET', '/fapi/v1/ticker/24hr', {
            symbol: Filters.revertSymbol(symbol)
        }, false);

        return Filters.convertTicker(res);
    }

    async getKlines({ symbol, period, limit }) {
        const res = await this.binance.invoke('GET', '/fapi/v1/klines', {
            symbol: Filters.revertSymbol(symbol),
            interval: Filters.revertPeriod(period),
            limit
        }, false);

        return Filters.convertKlines(res);
    }

    async order() {
        console.log('binance futures order');
    }
};