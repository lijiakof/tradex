const Okex = require('../core/okex');
const Filters = require('../filters/filters.okex');

module.exports = class FuturesOkex {
    constructor({ host, apiKey, secretKey, passPhrase }) {
        this.okex = new Okex(host, apiKey, secretKey, passPhrase);
    }

    async getDepth({ symbol, depth }) {
        const res = await this.okex.invoke('GET', `/api/swap/v3/instruments/${Filters.revertFuturesSymbol(symbol)}/depth`, {
            instrument_id: Filters.revertFuturesSymbol(symbol),
            size: depth
        });

        return Filters.convertDepths(res);
    }

    async getTicker(symbol) { 
        const res = await this.okex.invoke('GET', `/api/swap/v3/instruments/${Filters.revertFuturesSymbol(symbol)}/ticker`);

        return Filters.convertTicker(res);
    }

    async getKlines({ symbol, period, limit }) {
        const { start, end } = Filters.revertTimeRange(period, limit);

        const res = await this.okex.invoke('GET', `//api/swap/v3/instruments/${Filters.revertFuturesSymbol(symbol)}/candles`, {
            granularity: Filters.revertPeriod(period),
            start,
            end
        });

        return Filters.convertKlines(res);
    }

    async order() {
        console.log('okex futures order');
    }
};