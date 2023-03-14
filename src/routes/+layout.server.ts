import { decrypt } from '$lib/server/encryption';
import { login } from '$lib/server/studentvue';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	if (url.pathname === '/login') {
		return {
			streamed: {
				grades: null
			}
		};
	}

	const username = cookies.get('username');
	const encryptedPassword = cookies.get('password');
	if (!username || !encryptedPassword) {
		throw redirect(302, '/login');
	}

	let password;
	try {
		password = decrypt(encryptedPassword);
	} catch (error) {
		cookies.delete('username');
		cookies.delete('password');
		throw redirect(302, '/login');
	}

	const client = await login(username, password);

	if (!client) {
		cookies.delete('username');
		cookies.delete('password');
		throw redirect(302, '/login');
	}

	return {
		streamed: {
			grades: client.gradebook()
		}
	};
};
