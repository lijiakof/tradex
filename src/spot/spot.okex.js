const Okex = require('../core/okex');
const Filters = require('../filters/filters.okex');

module.exports = class SpotOkex {
    constructor(okex = new Okex()) {
        this.okex = okex;
    }

    async getDepth({ symbol, depth }) {
        const res = await this.okex.invoke('GET', `/api/spot/v3/instruments/${Filters.revertSymbol(symbol)}/book`, {
            instrument_id: Filters.revertSymbol(symbol),
            size: depth
        });

        return res;
    }

    // Retrieve the latest price snapshot, best bid/ask price, and trading volume in the last 24 hours for all trading pairs. This is publicly accessible without account authentication.
    async getTicker(symbol) { 
        const res = await this.okex.invoke('GET', `/api/spot/v3/instruments/${Filters.revertSymbol(symbol)}/ticker`);

        return Filters.convertTicker(res);
    }

    async getKlines({ symbol, period, limit }) {
        // TODO: limit to [start-end]
        console.log(limit);
        const res = await this.okex.invoke('GET', `/api/spot/v3/instruments/${Filters.revertSymbol(symbol)}/candles`, {
            granularity: Filters.revertPeriod(period),
            // start,
            // end
        });

        return Filters.convertKlines(res);
    }

    async getBalance(currency) { 
        const res = await this.getBalances([currency]);

        return res && res[currency];
    }

    async getBalances(currencies) { 
        const res = await this.okex.invoke('GET', '/api/spot/v3/accounts');

        const balances = {};
        currencies.forEach((c) => {
            balances[c] = 0;
        });

        for(const item of res) {
            if(balances[item.currency.toLocaleLowerCase()] === 0) {
                balances[item.currency.toLocaleLowerCase()] = item.balance;
            }
        }

        return balances;
    }

    async buy({ symbol, amount, price }) {
        const res = await this.okex.invoke('POST', '/api/spot/v3/orders', {
            type: 'limit',
            side: 'buy',
            instrument_id: Filters.revertSymbol(symbol),
            size: amount,
            price: price,
            order_type: 1
        });

        return res.order_id;
    }

    async sell({ symbol, amount, price }) { 
        const res = await this.okex.invoke('POST', '/api/spot/v3/orders', {
            type: 'limit',
            side: 'sell',
            instrument_id: Filters.revertSymbol(symbol),
            size: amount,
            price: price,
            order_type: 1
        });

        return res.order_id;
    }

    async cancelOrder({ orderId, symbol }) {
        const res = await this.okex.invoke('POST', `/api/spot/v3/cancel_orders/${orderId}`, {
            instrument_id: Filters.revertSymbol(symbol)
        });

        return res.order_id;
        
    }

    async getOrder(orderId, symbol) {
        const res = await this.okex.invoke('GET', `/api/spot/v3/orders/${orderId}`, {
            instrument_id: Filters.revertSymbol(symbol)
        });

        return res;
    }

    async getOrders({ symbol, limit }) {
        const res = await this.okex.invoke('GET', '/api/spot/v3/orders', {
            instrument_id: Filters.revertSymbol(symbol),
            state: 6, // TODO: revertState
            size: limit
        });

        return Filters.convertOrders(res);
    }
};