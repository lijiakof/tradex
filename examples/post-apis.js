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
    const buyId = await tradex.spot.buy({
        symbol: 'btc-usdt',
        amount: 0.001,
        price: 3000
    });
    console.log(buyId);

    const sellId = await tradex.spot.sell({
        symbol: 'btc-usdt',
        amount: 0.001,
        price: 10000
    });
    console.log(sellId);
})();