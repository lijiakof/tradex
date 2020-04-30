const Okex = require('../core/okex');

module.exports = class FuturesOkex {
    constructor(okex = new Okex()) {
        this.okex = okex;
    }

    async order() {
        console.log('okex futures order');
    }
};