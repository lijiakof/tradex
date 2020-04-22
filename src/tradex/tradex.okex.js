const Okex = require('../core/okex');

module.exports = class TradexOkex {
    constructor({ host, apiKey, secretKey, passPhrase }) {
        this.okex = new Okex(host, apiKey, secretKey, passPhrase);
    }

    convertSymbol(symbol) {
        return symbol.toLocaleUpperCase();
    }

    async getTicker(symbol) { 
        const res = await this.okex.invoke('GET', `/api/spot/v3/instruments/${this.convertSymbol(symbol)}/ticker`);

        return res;
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
            instrument_id: this.convertSymbol(symbol),
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
            instrument_id: this.convertSymbol(symbol),
            size: amount,
            price: price,
            order_type: 1
        });

        return res.order_id;
    }

    async getOrder(orderId, symbol) {
        const res = await this.okex.invoke('GET', `/api/spot/v3/orders/${orderId}`, {
            instrument_id: this.convertSymbol(symbol)
        });

        return res;
    }
}