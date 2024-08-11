import { Hono } from "hono";
import { applications } from "$routes/applications";
import { auth } from "$routes/auth";
import { example } from "$middleware/example";

const v1 = new Hono()
    .get("/health", example, (c) => {
        return c.text("ok");
    })
    .route("/app", applications)
    .route("/app", auth);

export const app = new Hono().route("/v1", v1);
