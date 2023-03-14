<script>
	import { grades } from '$lib/store';
	import '../app.postcss';
</script>

<div class="px-4">
	<div class="flex items-center justify-between border-b border-zinc-400 py-2">
		<h1 class="text-2xl"><a href="/">Grades</a></h1>
		{#if $grades}
			<h2 class="text-xl">{$grades.reportingPeriod.current.name}</h2>
		{/if}
	</div>
	<slot />
</div>
