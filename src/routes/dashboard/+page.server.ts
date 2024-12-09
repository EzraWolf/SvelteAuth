import { redirect } from "@sveltejs/kit"
import type { PageServerLoad, Actions } from "./$types"

export const load: PageServerLoad = async (event) => {
	// ===== PROTECTED PAGE =====
	// If the user is not logged in, redirect to the login page
	// Note that `user.username` is defined inside `$lib/server/auth.ts`
	if (!event.locals.user) {
		redirect(302, `/login?redirect=${event.url.pathname}`)
	}
	return {
		username: event.locals.user?.username
	}
}
