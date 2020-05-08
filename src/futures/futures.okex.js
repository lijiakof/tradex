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

        const res = await this.okex.invoke('GET', `/api/swap/v3/instruments/${Filters.revertFuturesSymbol(symbol)}/candles`, {
            granularity: Filters.revertPeriod(period),
            start,
            end
        });

        return Filters.convertKlines(res);
    }

    async setLeverage({ symbol, leverage }) { 
        const res = await this.okex.invoke('POST', `/api/swap/v3/accounts/${Filters.revertFuturesSymbol(symbol)}/leverage`, {
            instrument_id: Filters.revertFuturesSymbol(symbol),
            leverage,
            side: 3
        });

        return res;
    }

    async order({ symbol, position, amount, price }) {
        const res = await this.huobi.invoke('POST', '/api/swap/v3/order', {
            instrument_id: Filters.revertFuturesSymbol(symbol),
            price,
            size: amount,
            type: Filters.revertFuturesPosition(position),
            // order_type: 0 // TODO
        });

        return res.order_id;
    }

    async cancelOrder({ orderId, symbol }) {
        const res = await this.okex.invoke('POST', `/api/swap/v3/cancel_order/${Filters.revertFuturesSymbol(symbol)}/${orderId}`, {
            instrument_id: Filters.revertFuturesSymbol(symbol),
            order_id: orderId
        });

        return res.order_id;
    }

    async getOrder({ orderId, symbol }) {
        const res = await this.okex.invoke('GET', `/api/swap/v3/orders/${Filters.revertFuturesSymbol(symbol)}/${orderId}`, {
            instrument_id: Filters.revertFuturesSymbol(symbol),
            order_id: orderId
        });

        return res.order_id;
    }

    async getOrders({ symbol, limit }) {
        const res = await this.okex.invoke('GET', `/api/swap/v3/orders/${Filters.revertFuturesSymbol(symbol)}`, {
            instrument_id: Filters.revertSymbol(symbol),
            state: 6, // TODO: revertState
            limit
        });

        return res;
    }
};