import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { handleHtml } from "./handleHtml";

const app = new Hono();

app.use("*", logger());
app.use("*", cors({ origin: "*" }));
app.notFound((c) => c.json({ message: "Not Found" }, 404));

app.use("*", serveStatic({ root: "./" }));
app.get("*", handleHtml);

app.onError((err, c) => {
  console.error(err);
  return c.json(err, 500);
});

export default app;
