const Binance = require('../core/binance');
const Filters = require('../filters/filters.binance');

module.exports = class FuturesBinance {
    constructor({ host, apiKey, secretKey }) {
        this.binance = new Binance(host, apiKey, secretKey);
    }

    async getDepth({ symbol, depth }) {
        const res = await this.binance.invoke('GET', '/fapi/v1/depth', {
            symbol: Filters.revertSymbol(symbol),
            limit: depth
        }, false);

        return Filters.convertDepths(res);
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

    async setLeverage({ symbol, leverage }) {
        const res = await this.binance.invoke('POST', '/fapi/v1/leverage', {
            symbol,
            leverage
        });

        return res;
    }

    // async order({ type, symbol, amount, price }) {
    //     // positionSide: BOTH 单一持仓方向, LONG 多头, SHORT 空头
    //     // side: BUY, SELL
    //     const res = await this.binance.invoke('POST', '/fapi/v1/order', {
    //         symbol,
    //         side: 'BUY',
    //         positionSide: position.toLocaleUpperCase(),
    //         quantity: amount,
    //         price,
    //         type: 'LIMIT',
    //         timeInForce: 'GTC'
    //     });

    //     return res.orderId;
    // }

    async cancelOrder({ orderId, symbol }) {
        const res = await this.binance.invoke('DELETE', '/fapi/v1/order', {
            orderId,
            symbol: Filters.revertSymbol(symbol)
        });

        return res.orderId;
    }

    async getOrder({ orderId, symbol }) {
        const res = await this.binance.invoke('GET', '/fapi/v1/order', {
            orderId,
            symbol: Filters.revertSymbol(symbol)
        });

        return res;
    }
};