"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptText = exports.encryptText = void 0;
const crypto_1 = require("crypto");
const util_1 = require("util");
const PASSWORD_GENERATE_KEY = 'SywE2gpCKihKALNN1XcAywIzkVla6PDf';
const SALT_GENERATE_KEY = 'aPFDANBCHu8DVufXiBMaRGgy4KN8YqpTgxIIlvxBNAGwPSaCPgrtH2DkV8PR6Uz68E4fxirr04UCCvnniUDaKQ0dxvOblkh1eOgkLALIXCdtlJSODWIpT5ZVzYMM3ZID';
const encryptText = async (text) => {
    const key = (await (0, util_1.promisify)(crypto_1.scrypt)(PASSWORD_GENERATE_KEY, SALT_GENERATE_KEY, 32));
    const iv = (0, crypto_1.randomBytes)(16);
    const cipher = (0, crypto_1.createCipheriv)('aes-256-ctr', key, iv);
    const cipherText = Buffer.concat([cipher.update(text), cipher.final()]);
    return `${iv.toString('hex')}:${cipherText.toString('base64')}`;
};
exports.encryptText = encryptText;
const decryptText = async (encryptText) => {
    console.log('accessTokenDecryptText');
    const [ivHex, cipherBase64] = encryptText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const cipherText = Buffer.from(cipherBase64, 'base64');
    const key = (await (0, util_1.promisify)(crypto_1.scrypt)(PASSWORD_GENERATE_KEY, SALT_GENERATE_KEY, 32));
    const decipher = (0, crypto_1.createDecipheriv)('aes-256-ctr', key, iv);
    return Buffer.concat([decipher.update(cipherText), decipher.final()]);
};
exports.decryptText = decryptText;
//# sourceMappingURL=encryptAES.js.map