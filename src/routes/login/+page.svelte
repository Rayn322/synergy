<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Login from '$lib/components/Login.svelte';
	import { client } from '$lib/store';

	$: if ($client && browser) {
		goto('/');
	}
</script>

<div class="mx-auto mt-[20vh] flex w-[85vw] max-w-lg flex-col gap-y-4">
	<h1 class="mx-auto text-center text-2xl">super cool partial synergy replacement</h1>
	<Login />
</div>
