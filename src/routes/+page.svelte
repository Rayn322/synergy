<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { client } from '$lib/store';
	import type { Gradebook } from 'studentvue';
	import { onMount } from 'svelte';

	let grades: Gradebook | undefined;

	$: if (!$client && browser) {
		goto('/login');
	}

	onMount(async () => {
		grades = await $client.gradebook();
	});

	// remove text after the first parenthesis and fix '&' symbols
	function trimCourseTitle(title: string) {
		return title
			.replaceAll('&amp;', '&')
			.replace(/\(.*\)/, '')
			.trim();
	}
</script>

<div class="px-4">
	{#if grades}
		<div class="flex items-center justify-between border-b border-zinc-400 py-2">
			<h1 class="text-2xl">Grades</h1>
			<h2 class="text-xl">{grades.reportingPeriod.current.name}</h2>
		</div>

		<div
			class="mx-auto mt-4 max-w-2xl divide-y divide-zinc-200 rounded-md border bg-zinc-100 shadow"
		>
			{#each grades.courses as course}
				{@const marks = course.marks.at(0)}
				<div class="flex items-center justify-between gap-4 p-2">
					<p class="text-xl">{trimCourseTitle(course.title)}</p>
					<div class="flex w-24 shrink-0 justify-between text-lg">
						<span class="font-bold">{marks?.calculatedScore.string}</span>
						<span>{marks?.calculatedScore.raw.toFixed(2)}%</span>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="flex h-[80vh] items-center justify-center">
			<h1 class="text-center text-3xl">Loading...</h1>
		</div>
	{/if}
</div>
