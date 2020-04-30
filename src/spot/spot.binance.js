const Binance = require('../core/binance');
const Filters = require('../filters/filters.binance');

module.exports = class SpotBinance {
    constructor(binance = new Binance()) {
        this.binance = binance;
    }

    async getDepth({ symbol, depth }) {
        const res = await this.binance.invoke('GET', '/api/v3/depth', {
            symbol: Filters.revertSymbol(symbol),
            limit: depth
        }, false);

        return res;
    }

    // 24 hour rolling window price change statistics
    async getTicker(symbol) {
        const res = await this.binance.invoke('GET', '/api/v3/ticker/24hr', {
            symbol: Filters.revertSymbol(symbol)
        }, false);

        return Filters.convertTicker(res);
    }

    async getKlines({ symbol, period, limit }) {
        const res = await this.binance.invoke('GET', '/api/v3/klines', {
            symbol: Filters.revertSymbol(symbol),
            interval: Filters.revertPeriod(period),
            limit
        }, false);

        return Filters.convertKlines(res);
    }

    async getBalance(currency) { 
        const res = await this.getBalances([currency]);

        return res && res[currency];
    }

    async getBalances(currencies) {
        const res = await this.binance.invoke('GET', '/api/v3/account');

        const balances = {};
        currencies.forEach((c) => {
            balances[c] = 0;
        });

        for(const item of res.balances) {
            if(balances[item.asset.toLocaleLowerCase()] === 0) {
                balances[item.asset.toLocaleLowerCase()] = Number(item.free);
            }
        }

        return balances;
    }

    async buy({ symbol, amount, price }) {
        const res = await this.binance.invoke('POST', '/api/v3/order', {
            symbol: Filters.revertSymbol(symbol),
            side: 'BUY',
            type: 'LIMIT',
            quantity: amount,
            price,
            timeInForce: 'GTC'
        });
        
        return res.orderId;
    }

    async sell({ symbol, amount, price }) {
        const res = await this.binance.invoke('POST', '/api/v3/order', {
            symbol: Filters.revertSymbol(symbol),
            side: 'SELL',
            type: 'LIMIT',
            quantity: amount,
            price,
            timeInForce: 'GTC'
        });
        
        return res.orderId;
    }

    async cancelOrder({ orderId, symbol }) {
        const res = await this.binance.invoke('DELETE', '/api/v3/order', {
            orderId,
            symbol: Filters.revertSymbol(symbol)
        });

        return res.orderId;
    }

    async getOrder(orderId, symbol) {
        const res = await this.binance.invoke('GET', '/api/v3/order', {
            orderId,
            symbol: Filters.revertSymbol(symbol)
        });

        return Filters.convertOrder(res);
    }

    async getOrders({ symbol, startTime, endTime, limit }) {
        const res = await this.binance.invoke('GET', '/api/v3/allOrders', {
            symbol: Filters.revertSymbol(symbol),
            startTime, 
            endTime,
            limit
        });

        return Filters.convertOrders(res);
    }
};