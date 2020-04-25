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
    const ticker = await tradex.getTicker('btc-usdt');
    console.log(ticker);
})();
