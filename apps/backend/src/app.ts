import { Hono } from "hono";
import { applications } from "$backend/routes/applications";
import { auth } from "$backend/routes/auth";
import { cors } from "hono/cors";
import { example } from "$backend/middleware/example";
import { logger } from "hono/logger";

const v1 = new Hono()
    .get("/health", example, async (c) => {
        return c.text("ok");
    })
    .route("/app", applications)
    .route("/auth", auth);

export const app = new Hono()
    .use(
        cors({
            origin: "*",
        }),
    )
    .use(logger());

export const routes = app.route("/v1", v1);

export type AppType = typeof routes;
