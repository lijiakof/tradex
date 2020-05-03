const Ticker = require('../models/ticker');
const Kline = require('../models/kline');
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

    static revertPeriod(period) {
        // 60, 180, 300, 900, 1800, 3600, 7200, 14400, 21600, 43200, 86400, 604800
        const map = {
            '1min': '60',
            '5min': '300',
            '30min': '900',
            '1hour': '3600',
            '4hour': '14400',
            '1day': '86400',
            '1week': '604800'
        };

        return map[period] || period;
    }

    static convertKline(data) {
        let kline = new Kline();

        if(data) {
            kline._source = data;
            kline.time = new Date(data[0]).getTime();
            kline.open = data[1];
            kline.high = data[2];
            kline.low = data[3];
            kline.close = data[4];
            kline.volume = data[5];
        }
        
        return kline;
    }

    static convertKlines(data) {
        let klines = Array.from(Kline);

        if(data && Array.isArray(data)) {
            data.forEach(item => {
                item && klines.push(this.convertKline(item));
            });
        }
        
        return klines;
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

        if(data && Array.isArray(data)) {
            data.forEach(item => {
                item && orders.push(this.convertOrder(item));
            });
        }

        return orders;
    }

    static revertOrder() {}
};