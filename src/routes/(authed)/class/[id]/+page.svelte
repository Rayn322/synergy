<script lang="ts">
	import { page } from '$app/stores';
	import { trimCourseTitle } from '$lib/util';
	import type { PageData } from './$types';

	export let data: PageData;

	let id = $page.params.id;
	let numId = parseInt(id);

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
			<title>{trimCourseTitle(course.title)} - Grades</title>
		{/if}
	{/await}
</svelte:head>

{#await data.streamed.grades}
	<div class="flex h-[80vh] items-center justify-center">
		<h1 class="text-center text-3xl">Loading...</h1>
	</div>
{:then grades}
	{@const course = grades.courses.at(numId)}
	{#if course}
		<div class="mx-auto mt-4 max-w-2xl space-y-4">
			<div class="text-center">
				<h2 class="text-2xl font-semibold">{trimCourseTitle(course.title)}</h2>
				<h3 class="text-xl">{course.staff.name}</h3>
			</div>
			<div class="divide-y divide-zinc-200 rounded-md border bg-zinc-100 shadow">
				<!-- no clue why marks is an array but there's only one mark -->
				{#each course.marks[0].assignments as assignment, i}
					{@const points = getRawPoints(assignment.points)}
					<div class="flex items-center justify-between gap-4 p-2 ">
						<p class="text-lg">{assignment.name}</p>
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
