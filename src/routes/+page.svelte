<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { client } from '$lib/store';

	$: if (!$client && browser) {
		goto('/login');
	}
</script>

<p>super cool grades</p>
