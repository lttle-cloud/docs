---
sidebar_position: 4
---

# APIs

Node.js enables developers to build scalable server-side applications with JavaScript. Its event-driven architecture makes it ideal for APIs. While several frameworks exist &mdash; such as Express, Koa, and Fastify &mdash; this guide uses [Hono](https://hono.dev/), a lightweight and fast Node.js web framework.

---

We will be creating a simple API that will allow you to update a list of **countries** and items associated with each country. The data will be stored in a PostgreSQL database, and we will use Drizzle ORM to interact with the database.

This guide is comprised of 4 main steps:

- Setting up a new Node.js API project
- Setting up a dedicated [PostgreSQL](../..//software/postgresql.md) database for the API
- Migrating and seeding the database using [Drizzle ORM](https://orm.drizzle.team/)
- Deploying the API to lttle.cloud

We will publish this API and allow everybody to access it. Because of this we will not add any `POST` or `DELETE` routes that will create or delete data. We will add `GET` and `PUT` routes only for reading and updating data.

---

## Initializing the project

First, we need to create a new Node.js project for our API. You can use any runtime or framework you prefer, but for this example, we will use Node.js with [Hono](https://hono.dev/) for its simplicity and performance.

```bash npm2yarn
npm create hono@latest hono-api
```

And select the `nodejs` template when prompted.

Update the `tsconfig.json` to include the following settings:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "target": "esnext",
    "moduleResolution": "node10",
    "lib": ["esnext"],
    "types": ["node"],

    // Other Outputs
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    // Stricter Typechecking Options
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    "strict": true,
    "verbatimModuleSyntax": false,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true
  },
  "exclude": ["node_modules", "**/dist"]
}
```

## Setting up PostgreSQL

For local development, you can use Docker to run a PostgreSQL instance:

```yaml title="docker-compose.yml"
services:
  pg:
    image: ghcr.io/lttle-cloud/postgres:17-flash
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: db
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  pgdata:
```

Run the PostgreSQL container:

```bash
docker-compose up -d
```

And add the following to your `.env` file:

```env title=".env"
DATABASE_URL=postgresql://postgres:password@localhost:5432/db
```

For more details related to PostgreSQL on lttle.cloud, check out our [PostgreSQL guide](../../software/postgresql.md).

## Setting up Drizzle ORM

Here we recommend following the [Get Started with Drizzle and PostgreSQL](https://orm.drizzle.team/docs/get-started/postgresql-new) to set up Drizzle ORM in your project.

First, install the required dependencies:

```bash npm2yarn
npm install drizzle-orm pg
npm install -D drizzle-kit
```

Then, create a `drizzle.config.ts` file in the root of your project:

```typescript title="drizzle.config.ts"
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

## Database schema

Next, create the database schema in `src/db/schema.ts`:

```typescript title="src/db/schema.ts"
import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const list = pgTable("list", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
});

export const item = pgTable("item", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  description: text("description").notNull(),
  listId: integer("list_id")
    .notNull()
    .references(() => list.id),
});
```

## Migrations

Now, create the initial migration:

```bash npm2yarn
npx drizzle-kit generate
```

Run the migration to create the tables in the database:

```bash npm2yarn
npx drizzle-kit migrate
```

## Seeding the database

Finally, create a seed script in `src/db/seed.ts` to populate the database with initial data:

```typescript title="src/db/seed.ts"
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import { item, list } from "./schema.js";

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);

  await seed(db, { list, item }).refine((f) => ({
    list: {
      columns: {
        name: f.country(),
      },
      count: 2,
      with: {
        item: 3,
      },
    },
    item: {
      columns: {
        description: f.loremIpsum({ sentencesCount: 1 }),
      },
      count: 3,
    },
  }));
}

main();
```

Run the seed script:

```bash npm2yarn
npx tsx src/db/seed.ts
```

To verify that the data has been inserted correctly, you can use [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview) or any PostgreSQL client of your choice.

```bash npm2yarn
npx drizzle-studio
```

## Database Querying

To interact with the database in our API routes, we need to set up a Drizzle ORM instance. Create a new file `src/db/client.ts`:

```typescript title="src/db/client.ts"
import { eq } from "drizzle-orm";
import { db } from "./drizzle";
import { item, list } from "./schema";

export const getFullList = async () => {
  return db.select().from(list);
};

export function getListItems(id: number) {
  return db.select().from(item).where(eq(item.listId, id));
}

export const updateListItem = async (id: number, description: string) => {
  return db.update(item).set({ description }).where(eq(item.id, id));
};
```

Here, we have defined three functions:

- `getFullList`: Fetches all lists from the database.
- `getListItems`: Fetches all items associated with a specific list.
- `updateListItem`: Updates the description of a specific item.

## Adding our API routes

Open the `src/index.ts` file and modify it as follows:

```typescript title="src/index.ts"
import { getListItems, getFullList, updateListItem } from "./db/client";

app.get("/", (c) => {
  return c.text("Hello Hono from lttle.cloud!");
});

app.get("/lists", async (c) => {
  const lists = await getFullList();

  return c.json(lists);
});

app.get("/lists/:id/items", async (c) => {
  const id = Number(c.req.param("id"));
  const items = await getListItems(id);

  return c.json(items);
});

app.put("/items/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const { description } = await c.req.json();
  await updateListItem(id, description);

  return c.json({ message: "Item updated" });
});
```

## Testing the API locally

You can test the API locally by running the development server:

```bash npm2yarn
npm run dev
```

Now we can test our API endpoints using a tool like [Postman](https://www.postman.com/) or [curl](https://curl.se/).

```json command="curl -s http://localhost:3000/lists | jq"
[
  {
    "id": 1,
    "name": "Tanzania"
  },
  {
    "id": 2,
    "name": "Ghana"
  }
]
```

To get the list items for a specific list, we can use the following `GET` request:

```json command="curl -s http://localhost:3000/lists/1/items | jq"
[
  {
    "id": 4,
    "description": "Nulla non dapibus nibh, id ultricies augue. ",
    "listId": 1
  },
  {
    "id": 5,
    "description": "Integer pretium pulvinar sem, eget vehicula sem egestas vel. ",
    "listId": 1
  },
  {
    "id": 6,
    "description": "Integer mattis egestas tellus, et volutpat ligula placerat non. ",
    "listId": 1
  }
]
```

If we want to update an item, we can use the following `PUT` request:

```json command="curl -s -X PUT http://localhost:3000/items/4 -H 'Content-Type: application/json' -d '{"description":"Updated description"}'"
{
  "message": "Item updated"
}
```

And if we want to see the list item directly with its new description:

```json command="curl -s http://localhost:3001/items/4 | jq"
{
  "id": 4,
  "description": "Updated description",
  "listId": 1
}
```

## Deploying to lttle.cloud

Based on this project structure we have 4 things we need to deploy

- [PostgreSQL](../../software/postgresql.md) database [app](../../../resources/apps.mdx)
- A [volume](../../../resources/volumes.mdx) for the database data
- A [machine](../../../resources/machines.mdx) that will migrate the database on startup
- A [machine](../../../resources/machines.mdx) that will seed the database on startup
- The Node.js Hono API [app](../../../resources/apps.mdx) that will expose via a [service](../../../resources/services.mdx) definition the API publicly

It should look something like this in the `lttle.yaml` file:

```yaml title="hono-api.lttle.yaml"
app:
  name: nodejs-hono-api
  namespace: samples
```
