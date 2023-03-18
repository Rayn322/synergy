import { ENCRYPTION_KEY } from '$env/static/private';
import utf8 from 'crypto-js/enc-utf8';
import AES from 'crypto-js/aes';

export function encrypt(text: string) {
	return AES.encrypt(text, ENCRYPTION_KEY).toString();
}

export function decrypt(text: string) {
	return AES.decrypt(text, ENCRYPTION_KEY).toString(utf8) as string | null;
}
