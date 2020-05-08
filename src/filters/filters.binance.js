const Depth = require('../models/depth');
const Ticker = require('../models/ticker');
const Kline = require('../models/kline');
const Order = require('../models/order');
const OrderState = require('../models/order-state');

module.exports = class FilterBinance {

    static convertSymbol(data) {
        return data.toLocaleLowerCase();
    }

    static revertSymbol(symbol) {
        return symbol.replace('-', '').toLocaleUpperCase();
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
            ticker.symbol = this.convertSymbol(data.symbol);
            ticker.open = data.openPrice;
            ticker.close = data.lastPrice;
            ticker.high = data.highPrice;
            ticker.low = data.lowPrice;
        }

        return ticker;
    }

    static revertPeriod(period) {
        // 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M
        const map = {
            '1min': '1m',
            '5min': '5m',
            '30min': '30m',
            '1hour': '1h',
            '4hour': '4h',
            '1day': '1d',
            '1week': '1w'
        };

        return map[period] || period;
    }

    static convertKline(data) {
        let kline = new Kline();

        if(data) {
            kline._source = data;
            kline.time = data[0];
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
            order.symbol = this.convertSymbol(data.symbol);
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

    static convertOrders(data) {
        let orders = Array.from(Order);

        if(data && Array.isArray(data)) {
            data.forEach(item => {
                item && orders.push(this.convertOrder(item));
            });
        }

        return orders;
    }

    static revertFuturesType(type) {
        // positionSide: BOTH 单一持仓方向, LONG 多头, SHORT 空头
        // side: BUY, SELL
        const map = {
            'openlong': {
                side: 'BUY',
                positionSide: 'LONG'
            },
            'openshort': {
                side: 'BUY',
                positionSide: 'SHORT'
            },
            'closelong': {
                side: 'SELL',
                positionSide: 'LONG'
            },
            'closeshort': {
                side: 'SELL',
                positionSide: 'SHORT'
            }
        };

        return map[type];
    }
};