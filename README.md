# 💱Tradex
Cryptocurrency trade API for Nodejs.

## [Features](#⚖️Features) · [Install](#🛠Installing)· [Useage](#🎁Useage) · [Contact](#☎️Contact) · [APIs](#📖APIs) · [License](#📄License) · [中文](./README-CN.md)

## ⚖️Features
* Support some popular cryptocurrency exchanges
* Lightweight
* Less dependencies
* Only support spot, futures is planning
* Support Node 12+

## 🛠Installing
Using yarn:

```
$ yarn add tradex
```

Or using npm:

```
$ npm install tradex
```

## 🎁Useage
```
const Tradex = require('tradex');

const tradex = new Tradex({
    id: 'binance',
    host: 'https://api.domain.com',
    apiKey: 'your-apiKey',
    secretKey: 'your-secretKey'
});

// use promise.then()
radex.getBalance('usdt').then(res => {
    console.log(res);
});

// or use async/await
(async () => {
    const balance = await tradex.getBalance('usdt');
    console.log(balance);
})();
```

### 🔐How to get API's access permission
* [Binance](https://www.binance.com/en/usercenter/settings/api-management)
* [Huobi Global](https://www.huobi.com/en-us/apikey/)
    * recommend: [Sub Account](https://account.huobi.com/en-us/subaccount/add)
* [OKEx](https://www.okex.com/account/users/myApi)

### ☎️Contact
If you have any other questions on APIs, you can contact us by below ways:

* Telegram: 👉[https://t.me/aikuant](https://t.me/aikuant)👈
* Wechat: Scan 👇QR code👇 and add as a friend, then invite you to join the technical group

![Wechat](./static/wechat.png)

### 🏋🏻‍♂️Supported Exchange Markets

| Name | id | Document |
| ---- | ---- | ---- |
| Binance | binance | [doc](https://binance-docs.github.io/apidocs/spot/en/) |
| Huobi Global | huobi | [doc](https://huobiapi.github.io/docs/spot/v1/en/) |
| OKEx | okex | [doc](https://www.okex.com/docs/en/) |

## 📖APIs
* ✅ getTrick(symbol)
* 🕐 getTricks()
* 🕐 getKlines({ symbol, period, startTime, endTime })
* ✅ getDepth({ symbol, limit })
* ✅ getBalance(currency)
* ✅ getBalances(currencies)
* ✅ buy({ symbol, amount, price })
* 🕐 buys(orders)
* ✅ sell({ symbol, amount, price })
* 🕐 sells(orders)
* 🕐 order(options)
* ✅ cancelOrder({id, symbol})
* ✅ getOrder(id, symbol)
* ✅ getOrders({ symbol, startTime, endTime, limit })

### Models

## 📄License
[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2020-present, 一俢(1Jay)
