<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { client, grades } from '$lib/store';
	import { onMount } from 'svelte';

	$: if (!$client && browser) {
		goto('/login');
	}

	onMount(async () => {
		if (!$grades) {
			$grades = await $client.gradebook();
		}
	});

	// remove text after the first parenthesis and fix '&' symbols
	function trimCourseTitle(title: string) {
		return title
			.replaceAll('&amp;', '&')
			.replace(/\(.*\)/, '')
			.trim();
	}
</script>

{#if $grades}
	<div class="mx-auto mt-4 max-w-2xl divide-y divide-zinc-200 rounded-md border bg-zinc-100 shadow">
		{#each $grades.courses as course, i}
			{@const marks = course.marks.at(0)}
			<a href={`/class/${i}`} class="flex items-center justify-between gap-4 p-2 hover:bg-zinc-200">
				<p class="text-xl">{trimCourseTitle(course.title)}</p>
				<div class="flex w-24 shrink-0 justify-between text-lg">
					<span class="font-bold">{marks?.calculatedScore.string}</span>
					<span>{marks?.calculatedScore.raw.toFixed(2)}%</span>
				</div>
			</a>
		{/each}
	</div>
{:else}
	<div class="flex h-[80vh] items-center justify-center">
		<h1 class="text-center text-3xl">Loading...</h1>
	</div>
{/if}
