const Huobi = require('../core/huobi');
const Filters = require('../filters/filters.huobi');

module.exports = class FuturesHuobi {
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

    async getDepth({ symbol, depth }) {
        const res = await this.huobi.invoke('GET', '/swap-ex/market/depth', {
            symbol: Filters.revertSymbol(symbol),
            type: 'step0',
            depth
        });

        return res.tick;
    }

    async order() {
        console.log('huobi futures order');
    }
};