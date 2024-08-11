import { Hono } from "hono";
import { applications } from "$routes/applications";
import { auth } from "$routes/auth";
import { example } from "$middleware/example";
import { listen } from "$listen";

const v1 = new Hono()
    .get("/", example, (c) => {
        return c.json(c.var.message);
    })
    .route("/app", applications)
    .route("/app", auth);

const app = new Hono().route("/v1", v1);

listen(app);
