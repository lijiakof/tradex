const _ = require('lodash');
const Binance = require('../core/binance');

module.exports = class TradexBinance {
    constructor({ host, apiKey, secretKey }) {
        this.binance = new Binance(host, apiKey, secretKey);
    }

    convertSymbol(symbol) {
        return symbol.replace('-', '').toLocaleUpperCase();
    }

    async getTicker(symbol) {
        const res = await this.binance.invoke('GET', '/api/v3/ticker/24hr', {
            symbol: this.convertSymbol(symbol)
        }, false);

        return res;
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

        return balances
    }

    async buy({ symbol, amount, price }) {
        const res = await this.binance.invoke('POST', '/api/v3/order', {
            symbol: this.convertSymbol(symbol),
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
            symbol: this.convertSymbol(symbol),
            side: 'SELL',
            type: 'LIMIT',
            quantity: amount,
            price,
            timeInForce: 'GTC'
        });
        
        return res.orderId;
    }

    async getOrder(orderId, symbol) {
        const res = await this.binance.invoke('GET', '/api/v3/order', {
            orderId,
            symbol: this.convertSymbol(symbol)
        });

        return res;
    }
}