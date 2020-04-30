const crypto = require('crypto');

const cryptor = {
    hash(data, algorithm='md5', encoding='hex') {
        const hs = crypto.createHash(algorithm);

        return hs.update(data).digest(encoding);
    },
    hmac(data, key, algorithm='sha256', encoding='hex') {
        const hm = crypto.createHmac(algorithm, key);

        return hm.update(data).digest(encoding);
    }
};

const querystring = {
    stringify(params, sort) {
        let pars = [];
        for (let item in params) {
            params[item] && pars.push(item + '=' + encodeURIComponent(params[item]));
        }

        let query = sort ? pars.sort().join('&') : pars.join('&');

        return query;
    },
    parse() {}
};

module.exports = { cryptor, querystring };