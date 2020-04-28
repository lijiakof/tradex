const _ = require('lodash');
const Ticker = require('../models/ticker');
const Order = require('../models/order');
const OrderState = require('../models/order-state');

module.exports = class FilterHuobi {

    static convertSymbol(data) {
        return data.toLocaleLowerCase();
    }

    static revertSymbol(symbol) {
        return symbol.toLocaleUpperCase();
    }

    static convertTicker(data) {
        let ticker = new Ticker();

        if(data) {
            ticker._source = data;
            ticker.symbol = this.convertSymbol(data.instrument_id);
            ticker.open = data.open_24h;
            ticker.close = data.last;
            ticker.high = data.high_24h;
            ticker.low = data.low_24h;
        }

        return ticker;
    }

    static convertState(state) {
        // -2:失败
        // -1:撤单成功
        // 0:等待成交
        // 1:部分成交
        // 2:完全成交
        // 3:下单中
        // 4:撤单中

        const map = {
            '0': OrderState.new,
            '1': OrderState.partialFilled,
            '2': OrderState.filled,
            '4': OrderState.partialCanceled,
            '-1': OrderState.canceled
        };

        return map[state] || state;
    }

    static convertOrder(data) {
        let order = new Order();

        if(data) {

            order._source = data;
            order.id = data.order_id;
            order.symbol = this.convertSymbol(data.instrument_id);
            order.side = data.side;
            order.type = data.type;
            order.amount = data.size;
            order.price = data.price;
            order.state = this.convertState(data.state);
            order.createdTime = new Date(data.timestamp).getTime();
        }

        return order;
    }

    static convertOrders(data) {
        let orders = Array.from(Order);

        if(data && _.isArray(data)) {
            data.forEach(item => {
                item && orders.push(this.convertOrder(item));
            });
        }

        return orders;
    }

    static revertOrder() {}
};