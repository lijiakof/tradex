const Huobi = require('../core/huobi');
const Filters = require('../filters/filters.huobi');

module.exports = class SpotHuobi {
    constructor(huobi = new Huobi()) {
        this.accountId;

        this.huobi = huobi;
    }

    async getAccountId() {
        if(this.accountId) {
            return this.accountId;
        }

        const account = await this.getAccount();
        this.accountId = account && account[0].id;

        return this.accountId;
    }

    async getAccount() {
        const res = await this.huobi.invoke('GET', '/v1/account/accounts');

        return res.data;
    }

    async getDepth({ symbol, depth }) {
        const res = await this.huobi.invoke('GET', '/market/depth', {
            symbol: Filters.revertSymbol(symbol),
            type: 'step0',
            depth
        });

        return res.tick;
    }

    // This endpoint retrieves the latest ticker with some important 24h aggregated market data.
    async getTicker(symbol) {
        const res = await this.huobi.invoke('GET', '/market/detail/merged', {
            symbol: Filters.revertSymbol(symbol)
        });

        return Filters.convertTicker(res.tick);
    }

    async getKlines({ symbol, period, limit }) {
        const res = await this.huobi.invoke('GET', '/market/history/kline', {
            symbol: Filters.revertSymbol(symbol),
            period: Filters.revertPeriod(period),
            size: limit
        });

        return Filters.convertKlines(res.data);
    }

    async getBalance(currency) { 
        const res = await this.getBalances([currency]);

        return res && res[currency];
    }

    async getBalances(currencies) {
        const accountId = await this.getAccountId();
        const res = await this.huobi.invoke('GET', `/v1/account/accounts/${accountId}/balance`, null);

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
        const accountId = await this.getAccountId();
        const res = await this.huobi.invoke('POST', '/v1/order/orders/place', {
            'account-id': accountId,
            amount,
            price,
            'source': 'api',
            'symbol': Filters.revertSymbol(symbol),
            'type': 'buy-limit'
        });

        return res.data;
    }

    async sell({ symbol, amount, price }) {
        const accountId = await this.getAccountId();
        const res = await this.huobi.invoke('POST', '/v1/order/orders/place', {
            'account-id': accountId,
            amount,
            price,
            'source': 'api',
            'symbol': Filters.revertSymbol(symbol),
            'type': 'sell-limit'
        });

        return res.data;
    }

    async cancelOrder({ orderId }) {
        const res = await this.huobi.invoke('POST', `/v1/order/orders/${orderId}/submitcancel`);

        return res.data;
        
    }

    async getOrder(orderId) {
        const res = await this.huobi.invoke('GET', `/v1/order/orders/${orderId}`);

        return Filters.convertOrder(res.data);
    }

    async getOrders({ symbol, startTime, endTime, limit }) {
        const res = await this.huobi.invoke('GET', '/v1/order/orders', {
            symbol: Filters.revertSymbol(symbol),
            'start-time': startTime, 
            'end-time': endTime,
            states: 'submitted,partial-filled,partial-canceled,filled,canceled,created', // TODO: revertState
            size: limit
        });

        return Filters.convertOrders(res.data);
    }
};