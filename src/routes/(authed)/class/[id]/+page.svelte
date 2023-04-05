<script lang="ts">
	import { page } from '$app/stores';
	import { fixXmlText } from '$lib/util';
	import type { PageData } from './$types';

	export let data: PageData;

	$: id = $page.params.id;
	$: numId = parseInt(id);

	function getRawPoints(points: string) {
		const splitString = points.split(' ');
		const earned = parseFloat(splitString[0]);
		const max = parseFloat(splitString[2]);

		if (isNaN(earned) || isNaN(max)) {
			return null;
		}

		return { earned, max };
	}
</script>

<svelte:head>
	{#await data.streamed.grades then grades}
		{@const course = grades.courses.at(numId)}
		{#if course}
			<title>{fixXmlText(course.title)} - Grades</title>
		{/if}
	{/await}
</svelte:head>

{#await data.streamed.grades}
	<div class="flex h-[80vh] items-center justify-center">
		<h1 class="text-center text-3xl">Loading...</h1>
	</div>
{:then grades}
	{@const course = grades.courses.at(numId)}
	{@const previous = grades.courses.at(numId - 1)}
	{@const next = grades.courses.at(numId + 1)}

	{#if course}
		<div class="mx-auto mt-4 max-w-2xl space-y-4">
			<div class="flex items-center justify-between text-center">
				<div class="flex w-6 shrink-0 justify-start">
					{#if previous && numId - 1 >= 0}
						<a href={`/class/${numId - 1}`}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="h-6 w-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
								/>
							</svg>
						</a>
					{/if}
				</div>
				<div>
					<h2 class="text-2xl font-semibold">{fixXmlText(course.title)}</h2>
					<h3 class="text-xl">{course.staff.name}</h3>
				</div>
				<div class="flex w-6 shrink-0 justify-end">
					{#if next}
						<a href={`/class/${numId + 1}`}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="h-6 w-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
								/>
							</svg>
						</a>
					{/if}
				</div>
			</div>
			<div class="divide-y divide-zinc-200 rounded-md border bg-zinc-100 shadow">
				<!-- no clue why marks is an array but there's only one mark -->
				{#each course.marks[0].assignments as assignment, i}
					{@const points = getRawPoints(assignment.points)}
					<div class="flex items-center justify-between gap-4 p-2">
						<p class="text-lg">{fixXmlText(assignment.name)}</p>
						<div class="flex w-20 shrink-0 justify-around text-lg">
							{#if points}
								<span>{points.earned}</span>
								<span class="font-light text-zinc-500">/</span>
								<span>{points.max}</span>
							{:else}
								<p>---</p>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
{/await}
