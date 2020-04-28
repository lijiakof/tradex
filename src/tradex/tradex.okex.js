const Okex = require('../core/okex');
const Filters = require('./filters/filters.okex');

module.exports = class TradexOkex {
    constructor({ host, apiKey, secretKey, passPhrase }) {
        this.okex = new Okex(host, apiKey, secretKey, passPhrase);
    }

    async getTicker(symbol) { 
        const res = await this.okex.invoke('GET', `/api/spot/v3/instruments/${Filters.revertSymbol(symbol)}/ticker`);

        return Filters.convertTicker(res);
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

    async getOrder(orderId, symbol) {
        const res = await this.okex.invoke('GET', `/api/spot/v3/orders/${orderId}`, {
            instrument_id: Filters.revertSymbol(symbol)
        });

        return res;
    }
};