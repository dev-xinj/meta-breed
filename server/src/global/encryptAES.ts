import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
const PASSWORD_GENERATE_KEY = 'SywE2gpCKihKALNN1XcAywIzkVla6PDf';

const SALT_GENERATE_KEY =
  'aPFDANBCHu8DVufXiBMaRGgy4KN8YqpTgxIIlvxBNAGwPSaCPgrtH2DkV8PR6Uz68E4fxirr04UCCvnniUDaKQ0dxvOblkh1eOgkLALIXCdtlJSODWIpT5ZVzYMM3ZID';

export const encryptText = async (text: string): Promise<string> => {
  const key = (await promisify(scrypt)(
    PASSWORD_GENERATE_KEY,
    SALT_GENERATE_KEY,
    32,
  )) as Buffer;
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-ctr', key, iv);
  const cipherText = Buffer.concat([cipher.update(text), cipher.final()]);
  return `${iv.toString('hex')}:${cipherText.toString('base64')}`;
};

export const decryptText = async (encryptText: string) => {
  console.log('accessTokenDecryptText');
  const [ivHex, cipherBase64] = encryptText.split(':');

  const iv = Buffer.from(ivHex, 'hex');
  const cipherText = Buffer.from(cipherBase64, 'base64');
  const key = (await promisify(scrypt)(
    PASSWORD_GENERATE_KEY,
    SALT_GENERATE_KEY,
    32,
  )) as Buffer;
  const decipher = createDecipheriv('aes-256-ctr', key, iv);
  return Buffer.concat([decipher.update(cipherText), decipher.final()]);
};
