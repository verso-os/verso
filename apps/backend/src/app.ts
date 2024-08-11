import { client, e } from "$lib/database";

import { Hono } from "hono";
import { applications } from "$routes/applications";
import { auth } from "$routes/auth";
import { example } from "$middleware/example";

const v1 = new Hono()
    .get("/health", example, async (c) => {
        e.insert(e.service.Application, { name: "test" }).run(client);
        return c.text("ok");
    })
    .route("/app", applications)
    .route("/app", auth);

export const app = new Hono().route("/v1", v1);
