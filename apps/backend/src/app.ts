import { Hono } from "hono";
import { applications } from "$backend/routes/applications";
import { auth } from "$backend/routes/auth";
import { example } from "$backend/middleware/example";
import { logger } from "hono/logger";

const v1 = new Hono()
    .get("/health", example, async (c) => {
        return c.text("ok");
    })
    .route("/app", applications)
    .route("/app", auth);

export const app = new Hono().use(logger()).route("/v1", v1);

export type AppType = typeof app;
