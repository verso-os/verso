import { Hono, MiddlewareHandler } from "hono";

import { serve } from "@hono/node-server";

type ExampleMiddleware = MiddlewareHandler<{
    Variables: {
        message: string;
    };
}>;

const middleware: ExampleMiddleware = async (c, next) => {
    c.set("message", "Hello from middleware!");
    await next();
};

const app = new Hono()
    .get("/", middleware, (c) => {
        return c.json(c.var.message);
    })
    .get("/health", (c) => {
        return c.json({ status: "ok" });
    });

export type AppType = typeof app;

serve(
    {
        fetch: app.fetch,
        port: 9000,
    },
    (info) => {
        console.log(`Server is listening on port ${info.address}:${info.port}`);
    },
);
