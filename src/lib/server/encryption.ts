import { ENCRYPTION_KEY } from '$env/static/private';
import Cryptr from 'cryptr';

export function encrypt(text: string) {
	const cryptr = new Cryptr(ENCRYPTION_KEY);

	return cryptr.encrypt(text);
}

export function decrypt(text: string) {
	const cryptr = new Cryptr(ENCRYPTION_KEY);

	return cryptr.decrypt(text);
}
