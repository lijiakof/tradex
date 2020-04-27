const Order = require('../models/order');
const OrderState = require('../models/order-state');

module.exports = class FilterBinance {

    static revertSymbol(symbol) {
        return symbol.replace('-', '').toLocaleUpperCase();
    }

    static convertState(state) {        
        // NEW 新建订单
        // PARTIALLY_FILLED 部分成交
        // FILLED 全部成交
        // CANCELED 已撤销
        // PENDING_CANCEL 撤销中（目前并未使用）
        // REJECTED 订单被拒绝
        // EXPIRED 订单过期（根据timeInForce参数规则）

        const map = {
            NEW: OrderState.new,
            FILLED: OrderState.filled,
            CANCELED: OrderState.canceled,
            PARTIALLY_FILLED: OrderState.partialFilled,
            REJECTED: OrderState.rejected,
            EXPIRED: OrderState.expired
        };

        return map[state] || state;
    }

    static convertOrder(data) {
        let order = new Order();

        if(data) {
            order._source = data;
            order.id = data.orderId;
            order.symbol = data.symbol.toLocaleLowerCase();
            order.side = data.side.toLocaleLowerCase();
            order.type = data.type.toLocaleLowerCase();
            order.amount = Number(data.origQty);
            order.price = Number(data.price);
            order.state = this.convertState(data.status);
            order.createdTime = data.time;
        }
        
        return order;
    }

    static revertOrder() {}
}