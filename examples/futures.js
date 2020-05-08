const Tradex = require('../src/main');

const host = '';
const apiKey = 'your-apiKey';
const secretKey = 'your-secretKey';

const tradex = new Tradex({
    id: 'binance',
    host,
    apiKey,
    secretKey
});

(async () => {
    const depth = await tradex.futures.getDepth({
        symbol: 'btc-usdt',
        depth: 5
    });
    console.log(depth);

    const ticker = await tradex.futures.getTicker('btc-usdt');
    console.log(ticker);

    const klines = await tradex.futures.getKlines({
        symbol: 'btc-usdt',
        period: '1day',
        limit: 3
    });
    console.log(klines);

    const orderId = await tradex.futures.order({
        symbol: 'btc-usdt',
        type: 'openlong',
        price: 7000,
        amount: 0.01
    });
    console.log(orderId);
})();