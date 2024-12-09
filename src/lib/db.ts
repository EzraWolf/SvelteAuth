import { PrismaClient } from "@prisma/client"

// Setup a singleton instance of PrismaClient otherwise,
// Prisma will create a new client instance on every import
const db = new PrismaClient()

export default db
