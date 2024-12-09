<script lang="ts">
	import * as Form from "$lib/components/ui/form"
	import { Input } from "$lib/components/ui/input"
	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardContent
	} from "$lib/components/ui/card"
	import { Button } from "$lib/components/ui/button"
	import { Label } from "$lib/components/ui/label"
	import { loginSchema, type LoginSchema } from "./schema"
	import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms"
	import { zodClient } from "sveltekit-superforms/adapters"

	export let data: SuperValidated<Infer<LoginSchema>>

	const form = superForm(data, {
		validators: zodClient(loginSchema)
	})

	const { form: formData, enhance } = form
</script>

<Card class="mx-auto max-w-sm">
	<CardHeader>
		<CardTitle class="text-2xl">Login</CardTitle>
		<CardDescription>Enter your email below to login to your account</CardDescription>
	</CardHeader>
	<CardContent>
		<form method="POST" use:enhance>
			<div class="grid gap-4">
				<Form.Field {form} name="username">
					<Form.Control let:attrs>
						<Form.Label>Username</Form.Label>
						<Input {...attrs} bind:value={$formData.username} />
					</Form.Control>
					<Form.Description>This is your public display name.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="password">
					<Form.Control let:attrs>
						<Form.Label>Password</Form.Label>
						<Input type="password" {...attrs} bind:value={$formData.password} />
					</Form.Control>
				</Form.Field>
				<Form.Button>Submit</Form.Button>
				<Form.Button variant="outline">Login with GitHub</Form.Button>
			</div>

			<!-- Sign up link -->
			<div class="mt-4 text-center text-sm">
				Don&apos;t have an account?
				<a href="/signup" class="underline">Sign up</a>
			</div>
		</form>
	</CardContent>
</Card>
