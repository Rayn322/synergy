import StudentVue from 'studentvue';
import { client } from '$lib/store';
import { PUBLIC_DISTRICT_URL } from '$env/static/public';

export async function login(username: string, password: string) {
	const newClient = await StudentVue.login(PUBLIC_DISTRICT_URL, {
		username: username,
		password: password
	});

	client.set(newClient);
}

// TODO: somewhat encrypt password and store in local storage since
// 		   we don't have access to the session id
