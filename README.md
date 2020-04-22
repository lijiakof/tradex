# Tradex
Crypto currency trade API

## Features
* Support some popular crypto currency exchanges
* Only support spot, futures is planning
* Less dependencies
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
    host: '',
    apiKey: '',
    apiSecret: ''
});

const account = await tradex.getAccount();
console.log(account);
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

## Document
* [-]getTrick
* getTricks
* [-]getBalance
* [-]getBalances
* [-]buy
* [-]sell
* [-]getOrder

## License
[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2020-present, 一俢(1Jay)
