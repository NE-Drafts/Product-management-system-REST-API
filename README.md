# 📦 Product Management System REST API

This project is a REST API built with **Node.js**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**, using **PNPM** as the package manager.

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js ≥ 18
- PostgreSQL installed locally or accessible remotely
- [PNPM](https://pnpm.io/) installed globally:

```bash
npm install -g pnpm
# 📦 Product Management System REST API

A REST API built with **Node.js**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**, using **PNPM** as the package manager.

---

## 🚀 Getting Started

### ✅ Prerequisites

* Node.js ≥ 18
* PostgreSQL installed locally or accessible remotely
* [PNPM](https://pnpm.io/) installed globally:

```bash
npm install -g pnpm
```

---

## 📁 Project Setup

### 1. Clone and Install Dependencies

```bash
pnpm install
```

If `@prisma/client` isn’t found during compilation, install it:

```bash
pnpm add @prisma/client
```

If Prisma CLI isn't installed yet:

```bash
pnpm add -D prisma
```

---

### 2. Setup `.env` File

Create a `.env` file in the root directory with the following:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME"
```

Replace `USER`, `PASSWORD`, and `DATABASE_NAME` with your PostgreSQL details.

---

## ⚙️ Prisma Setup

### 3. Initialize Prisma

If not already initialized:

```bash
pnpx prisma init
```

This will create:

* `prisma/schema.prisma`
* `.env` file (overwrite if needed)

### 4. Edit `schema.prisma`

Example schema:

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Product {
  id        Int      @id @default(autoincrement())
  name      String
  price     Float
  createdAt DateTime @default(now())
}
```

### 5. Run Migration

```bash
pnpx prisma migrate dev --name init
```

This applies the schema and creates the database tables.

### 6. Generate Prisma Client

```bash
pnpx prisma generate
```

This outputs the client to `src/generated/prisma`.

---

## 🔌 Connecting to the Database

### Create `db.ts` file (e.g., `src/config/db.ts`):

```ts
import { PrismaClient } from '../generated/prisma';
import logger from '../logger';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
});

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
    logger.info('🔌 Connected to PostgreSQL database');
  } catch (error) {
    logger.error('❌ Failed to connect to PostgreSQL database');
    logger.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

export default prisma;
```

### Run the connection script manually:

```bash
pnpm ts-node src/config/db.ts
```

---

## 🧪 Common Issues and Fixes

### Cannot find `package.json` import

Update `tsconfig.json` to support JSON modules:

```json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "module": "CommonJS",
    ...
  }
}
```

### PrismaClient not found

Ensure you’ve run:

```bash
pnpx prisma generate
```

and are importing from the correct path (e.g., `../generated/prisma`).

### Prisma schema not found

Make sure `prisma/schema.prisma` exists or pass it explicitly:

```bash
pnpx prisma generate --schema=prisma/schema.prisma
```

---

## 📜 Optional Scripts in `package.json`

```json
"scripts": {
  "dev": "ts-node-dev src/index.ts",
  "db:generate": "pnpx prisma generate",
  "db:migrate": "pnpx prisma migrate dev",
  "db:reset": "pnpx prisma migrate reset",
  "db:connect": "pnpm ts-node src/config/db.ts"
}
```

---

## ✅ Summary

* Use PNPM for faster installs
* Always run `pnpx prisma generate` after editing your schema
* Use `.env` for your database credentials
* Keep generated Prisma Client in a clear path like `src/generated/prisma`
* Add custom logger and connection testing to validate DB setup

You're all set to build your Product Management System API! 🛠️
