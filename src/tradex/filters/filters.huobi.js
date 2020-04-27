const Order = require('../models/order');
const OrderState = require('../models/order-state');

module.exports = class FilterHuobi {

    static revertSymbol(symbol) {
        return symbol.replace('-', '').toLocaleLowerCase();
    }

    static convertState(state) {
        // submitted 已提交
        // partial-filled 部分成交
        // partial-canceled 部分成交撤销
        // filled 完全成交
        // canceled 已撤销
        // created 新建订单

        const map = {
            created: OrderState.new,
            submitted: OrderState.submitted,
            filled: OrderState.filled,
            canceled: OrderState.canceled,
            'partial-filled': OrderState.partialFilled,
            'partial-canceled': OrderState.partialCanceled
        };

        return map[state] || state;
    }

    static convertOrder(data) {
        let order = new Order();

        if(data) {
            const [side, type] = data.type.split('-');

            order._source = data;
            order.id = data.id;
            order.symbol = data.symbol;
            order.side = side;
            order.type = type;
            order.amount = Number(data.amount);
            order.price = Number(data.price);
            order.state = this.convertState(data.state);
            order.createdTime = data['created-at'];
        }

        return order;
    }

    static revertOrder() {}
};