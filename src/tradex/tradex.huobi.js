const _ = require('lodash');
const Huobi = require('../core/huobi');

module.exports = class TradexHuobi {
    constructor({ host, accessKey, secretKey }) {
        this.host = host;
        this.accessKey = accessKey;
        this.secretKey = secretKey;

        this.getAccount().then((account) => {
            this.accountId = account[0].id;
        });
        
    }

    async getAccount() {
        const res = await this.huobi.invoke('GET', '/v1/account/accounts');

        return res.data;
    }

    async getPrice(symbol) {}

    async buy({ symbol, amount, price }) { }

    async sell({ symbol, amount, price }) { }

    async getOrder(orderId, symbol) { }
}