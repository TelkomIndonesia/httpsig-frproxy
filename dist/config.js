"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    clientBodyBufferSize: parseInt(process.env.FRPROXY_CLIENT_BODY_BUFFER_SIZE || '') || 8192,
    hostmap: ((_a = process.env.FRPROXY_HOSTMAP) === null || _a === void 0 ? void 0 : _a.split(',').reduce((map, str) => {
        const [host, targethost] = str.trim().split(':');
        map.set(host, targethost);
        return map;
    }, new Map())) ||
        new Map(),
    doubleDashDomains: ((_b = process.env.FRPROXY_DOUBLEDASH_DOMAINS) === null || _b === void 0 ? void 0 : _b.split(',').map(v => v.trim())) || [],
    secure: (process.env.FRPROXY_PROXY_SECURE || 'true') === 'true',
    signature: {
        keyfile: process.env.FRPROXY_SIGNATURE_KEYFILE || './keys/signature/key.pem',
        pubkeyfile: process.env.FRPROXY_SIGNATURE_PUBKEYFILE || './keys/signature/pubkey.pem'
    },
    transport: {
        caKeyfile: process.env.FRPROXY_TRANSPORT_CA_KEYFILE || './keys/transport/ca-key.pem',
        caCertfile: process.env.FRPROXY_TRANSPORT_CA_CERTFILE || './keys/transport/ca.crt'
    }
};
//# sourceMappingURL=config.js.map