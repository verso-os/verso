import type { MiddlewareHandler } from "hono";

export type ExampleMiddleware = MiddlewareHandler<{
    Variables: {
        message: string;
    };
}>;

export const example: ExampleMiddleware = async (c, next) => {
    c.set("message", "Hello from middleware!");
    await next();
};
