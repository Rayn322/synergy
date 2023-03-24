import { encrypt } from '$lib/server/encryption';
import { login } from '$lib/server/studentvue';
import { fail, redirect } from '@sveltejs/kit';
import type { CookieSerializeOptions } from 'cookie';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const username = cookies.get('username');
	const encryptedPassword = cookies.get('password');
	if (username && encryptedPassword) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');
		const remember = data.get('remember');

		if (!username || !password) {
			return fail(400, {
				message: username ? 'Missing password' : 'Missing username',
				emailMissing: !username,
				passwordMissing: !password
			});
		}

		const client = await login(username?.toString(), password?.toString());
		if (!client) {
			return fail(401, {
				message: 'Invalid username or password',
				emailMissing: false,
				passwordMissing: false
			});
		}

		const encryptedPassword = encrypt(password?.toString());
		const options: CookieSerializeOptions = {
			httpOnly: true,
			sameSite: 'strict',
			secure: true
		};

		// remember for a month
		if (remember) {
			options.maxAge = 60 * 60 * 24 * 30;
		}

		cookies.set('username', username?.toString(), options);
		cookies.set('password', encryptedPassword, options);

		throw redirect(302, '/');
	}
};
