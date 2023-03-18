import { ENCRYPTION_KEY } from '$env/static/private';
import { AES, enc } from 'crypto-js';

export function encrypt(text: string) {
	return AES.encrypt(text, ENCRYPTION_KEY).toString();
}

export function decrypt(text: string) {
	return AES.decrypt(text, ENCRYPTION_KEY).toString(enc.Utf8) as string | null;
}
