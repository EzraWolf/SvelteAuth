import { z } from "zod"

export const loginSchema = z.object({
	username: z
		.string()
		.min(4, { message: "Username must be at least 4 characters" })
		.max(31, { message: "Username must be less than 31 characters" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" })
		.max(255, { message: "Password must be less than 255 characters" })
})

export type LoginSchema = typeof loginSchema
