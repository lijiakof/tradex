# 💱Tradex
基于 Nodejs 的数字货币交易 API。

## [功能](#features) · [安装](#installing) · [使用](#useage) · [联系我们](#contact) · [APIs](#apis) · [许可](#license) · [English](./README.md)

## ⚖️功能 <a id="features"></a>
* 支持一些主流数字货币交易所；
* 轻量级；
* 依赖少；
* 现在支持现货，期货正在计划中；
* 支持 Node 12+。

## 🛠安装 <a id="installing"></a>
使用 yarn:

```
$ yarn add tradex
```

或者使用 npm:

```
$ npm install tradex
```

## 🎁使用 <a id="useage"></a>
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

### 🔐如何获取各大交易所 API 权限
* [币安](https://www.binance.com/cn/usercenter/settings/api-management)
* [火币全球站](https://www.huobi.com/en-us/apikey/)
    * 体检使用: [子账户](https://account.huobi.com/en-us/subaccount/add)
* [OKEx](https://www.okex.com/account/users/myApi)

### ☎️联系我们 <a id="contact"></a>
如果您在使用中遇到问题，您可以使用以下方式联系我们：

* 电报群: 👉[https://t.me/aikuant](https://t.me/aikuant)👈
* 微信: 扫描下方👇二维码👇加为好友，稍后会邀请您加入技术群组

![微信](./static/wechat.png)

### 🏋🏻‍♂️支持的交易所

| 名字 | id | 文档 |
| ---- | ---- | ---- |
| 币安 | binance | [文档](https://binance-docs.github.io/apidocs/spot/en/) |
| 火币全球站 | huobi | [文档](https://huobiapi.github.io/docs/spot/v1/en/) |
| OKEx | okex | [文档](https://www.okex.com/docs/en/) |

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
    * 🕐 order(options)
* ✅ invoke({ method, path, data })

### Models

## 📄许可 <a id="license"></a>
[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2020-present, 一俢(1Jay)
