<script lang="ts">
	import { fixXmlText } from '$lib/util';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Grades</title>
</svelte:head>

{#await data.streamed.grades}
	<div class="flex h-[80vh] items-center justify-center">
		<h1 class="text-center text-3xl">Loading...</h1>
	</div>
{:then grades}
	<div class="mx-auto mt-4 max-w-2xl divide-y divide-zinc-200 rounded-md border bg-zinc-100 shadow">
		{#each grades.courses as course, i}
			{@const marks = course.marks.at(0)}
			<a href={`/class/${i}`} class="flex items-center justify-between gap-4 p-2 hover:bg-zinc-200">
				<p class="text-xl">{fixXmlText(course.title)}</p>
				<div class="flex w-24 shrink-0 justify-between text-lg">
					<span class="font-bold">{marks?.calculatedScore.string}</span>
					<span>{marks?.calculatedScore.raw.toFixed(2)}%</span>
				</div>
			</a>
		{/each}
	</div>
{/await}
