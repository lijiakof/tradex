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
        symbol: '',
        depth: 5
    });
    console.log(depth);
})();