# Tradex
Crypto currency trade API

## Features
* Support some popular crypto currency exchanges
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
    type: 'binance',
    host: '',
    apiKey: '',
    apiSecret: ''
});

const account = await tradex.getAccount();
console.log(account);
```

## License
[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2020-present, 一俢(1Jay)
