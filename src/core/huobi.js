const axios = require('axios');
const moment = require('moment');
const querystring = require('querystring');
const core = require('./core');

module.exports = class Huobi {
    constructor(host, accessKey, secretKey) {
        this.host = host || 'https://api.huobi.pro';
        this.accessKey = accessKey;
        this.secretKey = secretKey;
    }

    sign({ method, domain, path, params }) {
        const query = querystring.encode(params);
        const data = [method, domain, path, query].join('\n');
        const signature = core.hmac(data, this.secretKey, 'sha256', 'base64');

        return signature;
    }

    async invoke(method, path, data) {
        let params = {
            AccessKeyId: this.accessKey,
            SignatureMethod: 'HmacSHA256',
            SignatureVersion: 2,
            Timestamp: moment.utc().format('YYYY-MM-DDTHH:mm:ss')
        };

        params = method === 'GET' ? Object.assign(params, data) : params;

        params.Signature = this.sign({
            method,
            domain: 'api.huobi.pro',
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
            console.error(err)

            throw err;
        });

        if(resp.status != 'ok') {
            console.log(`${moment.utc().format('YYYY-MM-DDTHH:mm:ss')} error: ${path}`);
            console.error(resp);
        }

        return resp;
    }
}