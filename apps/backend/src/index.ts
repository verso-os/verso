import { Hono } from "hono";
import { example } from "$middleware/example";
import { listen } from "$listen";

const app = new Hono()
    .get("/", example, (c) => {
        return c.json(c.var.message);
    })
    .get("/health", (c) => {
        return c.json({ status: "ok" });
    });

listen(app);
