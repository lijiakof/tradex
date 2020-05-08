const Depth = require('../models/depth');
const Ticker = require('../models/ticker');
const Kline = require('../models/kline');
const Order = require('../models/order');
const OrderState = require('../models/order-state');

module.exports = class FilterHuobi {

    static revertSymbol(symbol) {
        return symbol.replace('-', '').toLocaleLowerCase();
    }

    static revertFuturesSymbol(symbol) {
        return symbol.toLocaleUpperCase();
    }

    static convertDepth(data) {
        let depth = new Depth();

        if(data) {
            depth._source = data;
            depth.price = data[0];
            depth.volume = data[1];
        }

        return depth;
    }

    static convertDepths(data) {
        let bids = Array.from(Depth);
        let asks = Array.from(Depth);

        if(data && Array.isArray(data.bids)) {
            data.bids.forEach(item => {
                item && bids.push(this.convertDepth(item));
            });
        }

        if(data && Array.isArray(data.asks)) {
            data.asks.forEach(item => {
                item && asks.push(this.convertDepth(item));
            });
        }

        return { bids, asks };
    }

    static convertTicker(data) {
        let ticker = new Ticker();

        if(data) {
            ticker._source = data;
            // ticker.symbol = data.symbol;
            ticker.open = data.open;
            ticker.close = data.close;
            ticker.high = data.high;
            ticker.low = data.low;
        }

        return ticker;
    }

    static revertPeriod(period) {
        // 1min, 5min, 15min, 30min, 60min, 4hour, 1day, 1week, 1mon, 1year
        const map = {
            '1min': '1min',
            '5min': '5min',
            '30min': '30min',
            '1hour': '60min',
            '4hour': '4hour',
            '1day': '1day',
            '1week': '1week'
        };

        return map[period] || period;
    }

    static convertKline(data) {
        let kline = new Kline();

        if(data) {
            kline._source = data;
            kline.time = data.id * 1000;
            kline.open = data.open;
            kline.high = data.high;
            kline.low = data.low;
            kline.close = data.close;
            kline.volume = data.vol;
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

    static revertFuturesPosition(type) {
        const map = {
            'openlong': {
                offset: 'open',
                direction: 'buy'
            },
            'openshort': {
                offset: 'open',
                direction: 'sell'
            },
            'closelong': {
                offset: 'close',
                direction: 'sell'
            },
            'closeshort': {
                offset: 'close',
                direction: 'buy'
            }
        };

        return map[type];
    }
};