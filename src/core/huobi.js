const axios = require('axios');
const moment = require('moment');
const { cryptor, querystring } = require('./core');

module.exports = class Huobi {
    constructor(host, accessKey, secretKey) {
        this.id = 'huobi';
        this.host = host || 'https://api.huobi.pro';
        this.accessKey = accessKey;
        this.secretKey = secretKey;
    }

    sign({ method, domain, path, params }) {
        const query = querystring.stringify(params, true);
        const data = [method, domain, path, query].join('\n');
        const signature = cryptor.hmac(data, this.secretKey, 'sha256', 'base64');

        return signature;
    }

    async invoke(method, path, data) {
        const signData = {
            AccessKeyId: this.accessKey,
            SignatureMethod: 'HmacSHA256',
            SignatureVersion: 2,
            Timestamp: moment.utc().format('YYYY-MM-DDTHH:mm:ss')
        };

        let params = method === 'GET' ? Object.assign(signData, data) : signData;

        params.Signature = this.sign({
            method,
            domain: this.host.indexOf('test') >= 0 ? 'api.testnet.huobi.pro' : 'api.huobi.pro',
            path,
            params
        });

        const resp = await axios({
            method: method,
            url: `${this.host}${path}`,
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 34000,
            params: params,
            data: method === 'POST' ? data : null
        }).then(res => {
            return res.data;
        }, err => {
            console.log(`${moment.utc().format('YYYY-MM-DDTHH:mm:ss')} error: ${path}`);
            console.error(err);

            throw err;
        });

        if(resp.status != 'ok') {
            console.log(`${moment.utc().format('YYYY-MM-DDTHH:mm:ss')} error: ${path}`);
            console.error(resp);
        }

        return resp;
    }
};