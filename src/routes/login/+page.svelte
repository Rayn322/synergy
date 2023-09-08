<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
	let loading = false;
</script>

<svelte:head>
	<title>Login - Grades</title>
</svelte:head>

<div class="mx-auto mt-[20vh] flex w-[85vw] max-w-lg flex-col gap-y-4">
	<h1 class="text-center text-2xl">super cool partial synergy replacement</h1>
	<form
		use:enhance={(stuff) => {
			loading = true;

			return async ({ result }) => {
				await applyAction(result);
				loading = false;
			};
		}}
		method="POST"
		class="flex flex-col rounded bg-zinc-100 p-4 text-lg shadow-md"
	>
		<label class="mb-2" for="username">Username</label>
		<input
			class="mb-4"
			class:border-red-600={form?.emailMissing}
			type="text"
			id="username"
			name="username"
		/>
		<label class="mb-2" for="password">Password</label>
		<input
			class="mb-4"
			class:border-red-600={form?.passwordMissing}
			type="password"
			id="password"
			name="password"
		/>
		<div class="mb-2 flex items-center gap-x-2">
			<input class="h-5 w-5" type="checkbox" id="remember" name="remember" />
			<label for="remember">Remember Me</label>
		</div>
		<button
			class="rounded bg-zinc-200 p-2 enabled:hover:bg-zinc-300 disabled:bg-zinc-300"
			disabled={loading}
			type="submit"
		>
			{#if loading}
				Loading...
			{:else}
				Login
			{/if}
		</button>
	</form>

	<a href="/broken">
		<div class="rounded bg-red-600 p-2 text-center text-zinc-50 hover:bg-red-700">
			<p>Broken for now</p>
			<p class="underline">Click to learn more</p>
		</div>
	</a>

	{#if form?.message}
		<div class="rounded bg-red-600 p-2 text-center text-zinc-50">{form.message}</div>
	{/if}
</div>
