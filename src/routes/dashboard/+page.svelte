<script lang="ts">
	import { onMount } from "svelte"
	import type { PageData } from "./$types"

	export let data: PageData

	let username: string

	onMount(() => {
		username = data.username
	})
</script>

<main class="container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Welcome to your Dashboard, {username}!</h1>
	<a href="/">Home</a>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<div class="rounded bg-white p-4 shadow">
			<h2 class="mb-2 text-xl font-semibold">Profile Overview</h2>
			<p>Username: {username}</p>
			<!-- Add more user details here -->
		</div>

		<div class="rounded bg-white p-4 shadow">
			<h2 class="mb-2 text-xl font-semibold">Recent Activity</h2>
			<p>No recent activity to display.</p>
			<!-- Add recent user activity here -->
		</div>
	</div>
</main>
