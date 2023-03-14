<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="flex items-center justify-between border-b border-zinc-400 py-2">
	<h1 class="text-2xl"><a href="/">Grades</a></h1>
	{#if data.streamed.grades}
		{#await data.streamed.grades then grades}
			<h2 class="text-xl">{grades.reportingPeriod.current.name}</h2>
		{/await}
	{/if}
</div>
<slot />
