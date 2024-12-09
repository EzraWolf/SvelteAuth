import db from "$lib/db"

import { lucia } from "$lib/server/auth"
import { fail, redirect } from "@sveltejs/kit"
import { loginSchema } from "./schema"
import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"

import type { Actions, PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals }) => {
	return {
		login_form: await superValidate(zod(loginSchema))
	}
}

export const actions: Actions = {
	default: async (event) => {
		let form = await superValidate(event, zod(loginSchema))
		if (!form.valid) {
			return fail(400, { form })
		}

		const existingUser = await db.user.findUnique({
			where: {
				username: form.data.username
			}
		})

		if (!existingUser) {
			// NOTE:
			// Returning immediately allows malicious actors to figure out valid usernames from response times,
			// allowing them to only focus on guessing passwords in brute-force attacks.
			// As a preventive measure, you may want to hash passwords even for invalid usernames.
			// However, valid usernames can be already be revealed with the signup page among other methods.
			// It will also be much more resource intensive.
			// Since protecting against this is non-trivial,
			// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
			// If usernames are public, you may outright tell the user that the username is invalid.
			return fail(400, {
				message: "Invalid username or password"
			})
		}

		const validPassword = await Bun.password.verify(form.data.password, existingUser.pwd_hash)
		if (!validPassword) {
			return fail(400, {
				message: "Invalid username or password"
			})
		}

		const session = await lucia.createSession(existingUser.id, {})
		const sessionCookie = lucia.createSessionCookie(session.id)
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		})

		console.log("logged in")

		const redirect_path = (event.url.searchParams.get("redirect") || "/") as string
		redirect(302, redirect_path)
	}
}
