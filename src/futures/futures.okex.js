const Okex = require('../core/okex');
const Filters = require('../filters/filters.okex');

module.exports = class FuturesOkex {
    constructor(okex = new Okex()) {
        this.okex = okex;
    }

    async getDepth({ symbol, depth }) {
        const res = await this.okex.invoke('GET', `/api/futures/v3/instruments/${Filters.revertSymbol(symbol)}/book`, {
            instrument_id: Filters.revertSymbol(symbol),
            size: depth
        });

        return res;
    }

    async getTicker(symbol) { 
        const res = await this.okex.invoke('GET', `/api/swap/v3/instruments/${Filters.revertSymbol(symbol)}/ticker`);

        return Filters.convertTicker(res);
    }

    async getKlines({ symbol, period, limit }) {
        // TODO: limit to [start-end]
        console.log(limit);
        const res = await this.okex.invoke('GET', `//api/swap/v3/instruments/${Filters.revertSymbol(symbol)}/candles`, {
            granularity: Filters.revertPeriod(period),
            // start,
            // end
        });

        return Filters.convertKlines(res);
    }

    async order() {
        console.log('okex futures order');
    }
};