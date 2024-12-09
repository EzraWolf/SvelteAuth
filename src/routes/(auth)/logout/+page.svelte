<script lang="ts">
	import { enhance } from "$app/forms"
	import * as Popover from "$lib/components/ui/popover"
	import { Button } from "$lib/components/ui/button"
	import { toast } from "svelte-sonner"
	import { redirect } from "@sveltejs/kit"
	import type { ActionData } from "./$types"
	import { goto } from "$app/navigation"
	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardContent
	} from "$lib/components/ui/card"
	/** @type {import('./$types').PageData} */
	//export let data

	export let form: ActionData

	$: if (form?.success) {
		toast.success(form.message)
		goto("/")
	} else if (form?.message) {
		toast.error(form.message)
	}
</script>

<Card class="mx-auto max-w-sm">
	<CardHeader>
		<CardTitle>Logout header</CardTitle>
	</CardHeader>
	<CardContent>
		<form method="POST" action="?/logout" use:enhance>
			<Button type="submit" variant="destructive">Logout</Button>
		</form>
	</CardContent>
</Card>
