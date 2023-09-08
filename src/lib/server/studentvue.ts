import StudentVue from 'studentvue';
import { DISTRICT_URL } from '$env/static/private';

export async function login(username: string, password: string) {
	try {
		return await StudentVue.login(DISTRICT_URL, {
			username: username,
			password: password
		});
	} catch (e) {
		console.error(e);
		return null;
	}
}
