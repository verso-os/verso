import { Hono } from "hono";
import { applications } from "$backend/routes/applications";
import { auth } from "$backend/routes/auth";
import { example } from "$backend/middleware/example";

const v1 = new Hono()
    .get("/health", example, async (c) => {
        return c.text("ok");
    })
    .route("/app", applications)
    .route("/app", auth);

export const app = new Hono().route("/v1", v1);

export type AppType = typeof app;
