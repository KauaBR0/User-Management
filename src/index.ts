import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { db } from "./db";
import { users, posts } from "./db/schema";
import { eq } from "drizzle-orm";
import "dotenv/config";

const app = new Hono();

app.use("*", logger());
app.use("*", cors());

// Users endpoints
app.get("/users", async (c) => {
  const allUsers = await db.select().from(users);
  return c.json(allUsers);
});

app.post("/users", async (c) => {
  const body = await c.req.json();
  const newUser = await db.insert(users).values(body).returning();
  return c.json(newUser[0]);
});

app.get("/users/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const user = await db.select().from(users).where(eq(users.id, id));
  if (user.length === 0) {
    return c.json({ error: "User not found" }, 404);
  }
  return c.json(user[0]);
});

// Posts endpoints
app.get("/posts", async (c) => {
  const allPosts = await db.select().from(posts);
  return c.json(allPosts);
});

app.post("/posts", async (c) => {
  const body = await c.req.json();
  const newPost = await db.insert(posts).values(body).returning();
  return c.json(newPost[0]);
});

app.get("/posts/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const post = await db.select().from(posts).where(eq(posts.id, id));
  if (post.length === 0) {
    return c.json({ error: "Post not found" }, 404);
  }
  return c.json(post[0]);
});

const port = process.env.PORT || 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port: Number(port),
});
