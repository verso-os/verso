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

const app = new Hono().use(middleware).get("/", (c) => {
    return c.json(c.var.message);
});

const port = 9000;
console.log(`Server is running on port ${port}`);

serve({
    fetch: app.fetch,
    port,
});
