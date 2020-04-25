# 💱Tradex
Crypto currency trade API for Nodejs

## Features
* Support some popular crypto currency exchanges
* Lightweight
* Less dependencies
* Only support spot, futures is planning
* Support Node 12+

## Installing
Using yarn:

```
$ yarn add tradex
```

Or using npm:

```
$ npm install tradex
```

## Useage

```
const Tradex = require('tradex');

const tradex = new Tradex({
    id: 'binance',
    host: 'https://api.domain.com',
    apiKey: 'vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A',
    secretKey: 'NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j'
});

// use promise.then()
radex.getBalance('usdt').then(res => {
    console.log(res);
})

// or use async/await
(async () => {
    const balance = await tradex.getBalance('usdt');
    console.log(balance);
})();
```

### How to get API's access permission
* [Binance](https://www.binance.com/en/usercenter/settings/api-management)
* [Huobi Global](https://www.huobi.com/en-us/apikey/)
    * recommend: [Sub Account](https://account.huobi.com/en-us/subaccount/add)
* [OKEx](https://www.okex.com/account/users/myApi)

### Supported Exchange Markets

| Name | id | Document |
| ---- | ---- | ---- |
| Binance | binance | [doc](https://binance-docs.github.io/apidocs/spot/en/) |
| Huobi Global | huobi | [doc](https://huobiapi.github.io/docs/spot/v1/en/) |
| OKEx | okex | [doc](https://www.okex.com/docs/en/) |

## APIs
* ✅ getTrick(symbol)
* 🕐 getTricks()
* ✅ getBalance(currency)
* ✅ getBalances(currencies)
* ✅ buy({ symbol, amount, price })
* 🕐 buys(orders)
* ✅ sell({ symbol, amount, price })
* 🕐 sells(orders)
* 🕐 order(options)
* ✅ getOrder(id, symbol)
* 🕐 getOrders()

## License
[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2020-present, 一俢(1Jay)
