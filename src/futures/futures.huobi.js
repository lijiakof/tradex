const Huobi = require('../core/huobi');
const Filters = require('../filters/filters.huobi');

module.exports = class FuturesHuobi {
    constructor({ host, apiKey, secretKey }) {
        this.accountId;

        this.huobi = new Huobi(host, apiKey, secretKey);
    }

    async getAccountId() {
        if(this.accountId) {
            return this.accountId;
        }

        const account = await this.getAccount();
        this.accountId = account && account[0].id;

        return this.accountId;
    }

    async getDepth({ symbol, depth }) {
        const res = await this.huobi.invoke('GET', '/swap-ex/market/depth', {
            contract_code: Filters.revertFuturesSymbol(symbol),
            type: 'step0',
            depth
        });

        return res.tick;
    }

    async getTicker(symbol) {
        const res = await this.huobi.invoke('GET', '/swap-ex/market/detail/merged', {
            contract_code: Filters.revertFuturesSymbol(symbol)
        });

        return Filters.convertTicker(res.tick);
    }

    async getKlines({ symbol, period, limit }) {
        const res = await this.huobi.invoke('GET', '/swap-ex/market/history/kline', {
            contract_code: Filters.revertFuturesSymbol(symbol),
            period: Filters.revertPeriod(period),
            size: limit
        });

        return Filters.convertKlines(res.data);
    }

    async order() {
        console.log('huobi futures order');
    }
};