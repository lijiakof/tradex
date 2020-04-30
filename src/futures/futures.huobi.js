const Huobi = require('../core/huobi');

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

    async order() {
        console.log('huobi futures order');
    }
};