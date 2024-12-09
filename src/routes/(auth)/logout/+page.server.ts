import { lucia } from "$lib/server/auth"
import { fail, redirect } from "@sveltejs/kit"

import type { Actions, PageServerLoad } from "./$types"
import { toast } from "svelte-sonner"

export const load: PageServerLoad = async ({ locals }) => {
	// ...
}

export const actions: Actions = {
	logout: async (event) => {
		console.log("Logging out")
		if (!event.locals.session) {
			return {
				success: false,
				message: "You are not logged in!!"
			}
		}

		await lucia.invalidateSession(event.locals.session.id)
		const sessionCookie = lucia.createBlankSessionCookie()
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		})
		console.log("Logged out")
		return {
			success: true,
			message: "You have successfully logged out"
		}
	}
}
