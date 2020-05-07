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

        return Filters.convertDepths(res.tick);
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

    setLeverage() { 
        console.warn('Huobi is no "setLeverage" API!');
    }

    // async order({ type, symbol, amount, price }) {

    //     const res = await this.huobi.invoke('POST', '/swap-api/v1/swap_order', {
    //         contract_code: Filters.revertFuturesSymbol(symbol),
    //         price,
    //         volume: amount,
    //         lever_rate: 1,
    //         direction: 'sell',
    //         offset: 'close', // 'open' or 'close'
    //         order_price_type: 'limit'
    //     });

    //     return res.data && res.data.order_id;
    // }

    async cancelOrder({ orderId, symbol }) {
        const res = await this.binance.invoke('POST', '/swap-api/v1/swap_cancel', {
            order_id: orderId,
            contract_code: Filters.revertFuturesSymbol(symbol)
        });

        return res.data && res.data.order_id;
    }

    async getOrder({ orderId, symbol }) {
        const res = await this.binance.invoke('POST', '/swap-api/v1/swap_order_info', {
            order_id: orderId,
            contract_code: Filters.revertFuturesSymbol(symbol)
        });

        return res.data;
    }
};