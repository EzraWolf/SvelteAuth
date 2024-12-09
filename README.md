# AIO-SAAS?

## Creating from scratch

```bash
# Create the new project
bun create svelte@latest aio-saas
```

```bash
# Install tailwindcss (all default settings)
bun x svelte-add@latest tailwindcss

# Install shadcn-svelte (all default settings)
bun x shadcn-svelte@latest init
```

```bash
# Fix .prettierrc
"semi": false,
...
"singleQuote": false
```

```bash
# Cleanup everything and add Node.js types
bun i
bun i -D @types/node
bun i -D @types/bun
bun run format
```

```bash
# Install prisma
bun i -D prisma
bun i @prisma/client
bun prisma init
```

```prisma
# Add the schema models

model User {
  id       String  @id @default(cuid())
  email    String  @unique
  username String? @unique

  is_verified Boolean @default(false)
  is_admin    Boolean @default(false)

  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  auth_session Session[]
  key          Key[]
}

model Session {
  id      String @id @default(cuid())
  user_id String
  user    User   @relation(fields: [user_id], references: [id], onDelete: Cascade)

  @@index([user_id])
}

model Key {
  id       String @id @default(cuid())
  user_id  String
  pwd_hash String
  user     User   @relation(fields: [user_id], references: [id], onDelete: Cascade)

  @@index([user_id])
}
```

```bash
# Update package.json scripts

# These make Vite use the Bun.js runtime instead of Node.js
"dev": "bun x --bun vite dev",
"build": "bun x --bun vite build",
"preview": "bun x --bun vite preview",
...

# These help clean up the codebase and manage the database
"format": "prettier --write . && bun run db:clean",
"ui:add": "bun x shadcn-svelte@latest add",
"db:clean": "bun prisma format",
"db:studio": "bun x prisma studio",
"db:migrate": "bun x prisma migrate dev",
"db:push": "bun x prisma db push",
"db:generate": "bun x prisma generate",
"db:deplay": "bun x prisma migrate deploy",
"db:update": "bun run db:clean && bun run db:migrate && bun run db:generate",
"db:build": "bun run db:clean && bun run db:deplay && bun run db:generate"
```

```bash
# Clean the prisma schema, migrate the db, then generate the prisma client
bun run db:update
```

```typescript
// src/lib/db.ts
import { PrismaClient } from "@prisma/client"

// Setup a singleton instance of PrismaClient otherwise,
// Prisma will create a new client instance on every import
const db = new PrismaClient()

export default db
```

```bash
# Install lucia for auth
bun i -D lucia
bun i @lucia-auth/adapter-prisma
```

```typescript
// src/lib/server/auth.ts
import db from "$lib/db"

import { Lucia } from "lucia"
import { dev } from "$app/environment"
import { PrismaAdapter } from "@lucia-auth/adapter-prisma"

const adapter = new PrismaAdapter(db.session, db.user)

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	}
})

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia
	}
}
```

```bash
bun run dev
# or automatically open the new page
bun run dev -- --open
```

```bash
# Build for production
bun run build
# or preview
bun run preview
```

```bash
# Install Threlte
bun i three @threlte/core @threlte/extras @types/three
```
