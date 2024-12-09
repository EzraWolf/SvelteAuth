<script lang="ts">
	import type { PageData } from "./$types"
	import LoginForm from "./login-form.svelte"
	import { enhance } from "$app/forms"

	import { loginSchema } from "./schema"
	import { superValidate } from "sveltekit-superforms/client"
	import { zodClient } from "sveltekit-superforms/adapters"

	export let data: PageData
</script>

<h1>Sign in</h1>
<!--
<form method="post" use:enhance>
	<label for="username">Username</label>
	<input name="username" id="username" /><br />
	<label for="password">Password</label>
	<input type="password" name="password" id="password" /><br />
	<button>Continue</button>
</form>
-->

<LoginForm data={data.login_form} />

<!--
{#if data.login_status}
	<p>{data.login_status}</p>
{/if}
-->
