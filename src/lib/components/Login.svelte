<script lang="ts">
	import { login } from '$lib/studentvue';

	let username: string;
	let password: string;
</script>

<form class="flex flex-col rounded bg-zinc-100 p-4 text-lg shadow-md">
	<label class="mb-2" for="username">Username</label>
	<input class="mb-4" type="text" id="username" bind:value={username} />
	<label class="mb-2" for="password">Password</label>
	<input class="mb-4" type="password" id="password" bind:value={password} />
	<button
		class="bg-zinc-200 p-2 hover:bg-zinc-300"
		type="submit"
		on:click|preventDefault={() => login(username, password)}>Login</button
	>
</form>
