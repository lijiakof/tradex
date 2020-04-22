const _ = require('lodash');
const Huobi = require('../core/huobi');

module.exports = class TradexHuobi {
    constructor({ host, apiKey, secretKey }) {
        this.accountId;

        this.huobi = new Huobi(host, apiKey, secretKey);
    }

    async initAccount() {
        const account = await this.getAccount();
        this.accountId = account[0].id;

        return account;
    }

    async getAccount() {
        const res = await this.huobi.invoke('GET', '/v1/account/accounts');

        return res.data;
    }

    convertSymbol(symbol) {
        return symbol.replace('-', '');
    }

    async getTicker(symbol) {
        const res = await this.huobi.invoke('GET', '/market/detail/merged', {
            symbol: 'btcusdt'
        });

        return res.tick;
    }

    async getBalance(currency) { 
        const res = await this.getBalances([currency]);

        return res && res[currency];
    }

    async getBalances(currencies) {
        const res = await this.huobi.invoke('GET', `/v1/account/accounts/${this.accountId}/balance`, null);

        const balances = {};
        currencies.forEach((c) => {
            balances[c] = 0;
        });

        for(const item of res.data.list) {
            if(balances[item.currency] === 0 && item.type === 'trade') {
                balances[item.currency] = item.balance;
            }
        }

        return balances;
    }

    async buy({ symbol, amount, price }) {
        const res = await this.huobi.invoke('POST', `/v1/order/orders/place`, {
            'account-id': this.accountId,
            amount,
            price,
            'source': 'api',
            symbol: this.convertSymbol(symbol),
            'type': 'buy-limit',
            // "client-order-id": '' todo
        });

        return res.data;
    }

    async sell({ symbol, amount, price }) {
        const res = await this.huobi.invoke('POST', `/v1/order/orders/place`, {
            'account-id': this.accountId,
            amount,
            price,
            'source': 'api',
            symbol: this.convertSymbol(symbol),
            'type': 'sell-limit',
            // "client-order-id": "t0001" todo
        });

        return res.data;
    }

    async getOrder(orderId) {
        const res = await this.huobi.invoke('GET', `/v1/order/orders/${orderId}`);

        return res.data;
    }
}