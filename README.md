# 💱Tradex
Cryptocurrency trade API for Nodejs.

## [Features](#features) · [Install](#installing) · [Useage](#useage) · [Contact](#contact) · [APIs](#apis) · [License](#license) · [中文](./README-CN.md)

## ⚖️Features <a id="features"></a>
* Support some popular cryptocurrency exchanges
* Lightweight
* Less dependencies
* Only support spot, futures is planning
* Support Node 12+

## 🛠Installing <a id="installing"></a>
Using yarn:

```
$ yarn add tradex
```

Or using npm:

```
$ npm install tradex
```

## 🎁Useage <a id="useage"></a>
```
const Tradex = require('tradex');

const tradex = new Tradex({
    id: 'binance',
    host: 'https://api.domain.com',
    apiKey: 'your-apiKey',
    secretKey: 'your-secretKey'
});

// use promise.then()
tradex.spot.getBalance('usdt').then(res => {
    console.log(res);
});

// or use async/await
(async () => {
    const balance = await tradex.spot.getBalance('usdt');
    console.log(balance);
})();
```

### 🔐How to get API's access permission
* [Binance](https://www.binance.com/en/usercenter/settings/api-management)
* [Huobi Global](https://www.huobi.com/en-us/apikey/)
    * recommend: [Sub Account](https://account.huobi.com/en-us/subaccount/add)
* [OKEx](https://www.okex.com/account/users/myApi)

### ☎️Contact <a id="contact"></a>
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

## 📖APIs <a id="apis"></a>
* spot
    * ✅ getTrick(symbol)
    * ✅ getKlines({ symbol, period, limit })
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
    * 🚧 getOrders({ symbol, startTime, endTime, limit })
* futures(perpetual)
    * 🕐 getDepth({ symbol, limit })
    * 🕐 order(options)
* ✅ invoke({ method, path, data })


### Models

## 📄License <a id="license"></a>
[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2020-present, 一俢(1Jay)
