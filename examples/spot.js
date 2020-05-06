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
    // GET APIs
    const ticker = await tradex.spot.getTicker('btc-usdt');
    console.log(ticker);

    const balance = await tradex.spot.getBalance('usdt');
    console.log(balance);

    const order = await tradex.spot.getOrder(1234567, 'btc-usdt');
    console.log(order);

    // POST APIs
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