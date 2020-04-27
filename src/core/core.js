const crypto = require('crypto');

const core = {
    hash(data, algorithm='md5', encoding='hex') {
        const hs = crypto.createHash(algorithm);

        return hs.update(data).digest(encoding);
    },
    hmac(data, key, algorithm='sha256', encoding='hex') {
        const hm = crypto.createHmac(algorithm, key);

        return hm.update(data).digest(encoding);
    }
};

module.exports = core;