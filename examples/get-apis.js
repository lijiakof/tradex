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
    const ticker = await tradex.spot.getTicker('btc-usdt');
    console.log(ticker);

    const balance = await tradex.spot.getBalance('usdt');
    console.log(balance);

    const balances = await tradex.spot.getBalances(['usdt', 'btc']);
    console.log(balances);
})();
