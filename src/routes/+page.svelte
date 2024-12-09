<script lang="ts">
	import { Button } from "$lib/components/ui/button"

	import type { PageData } from "./$types"
	export let data: PageData
</script>

<h1>Welcome to SvelteKit</h1>

{#if data.user}
	<p>Welcome, {data.user.username}</p>
	<a href="/dashboard">Dashboard</a>
{/if}

<Button variant="outline" href="/login">Login</Button>

<Button variant="outline" href="/logout">Logout</Button>

<Button variant="outline" href="/signup">Sign up</Button>

<Button variant="outline" href="/gui">GUI</Button>
