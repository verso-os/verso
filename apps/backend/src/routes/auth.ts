import { client, e } from "$backend/lib/database";
import { hash, verify } from "@node-rs/argon2";

import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

export const auth = new Hono()
    .post(
        "/:app/login",
        zValidator(
            "param",
            z.object({
                app: z.string().uuid(),
            }),
        ),
        zValidator(
            "json",
            z.object({
                email: z.string().email(),
                password: z.string(),
            }),
        ),
        async (c) => {
            const app = c.req.param("app");
            const body = c.req.valid("json");

            const getApplicationQuery = e.select(e.service.Application, (application) => ({
                id: true,
                filter_single: e.op(application.id, "=", e.uuid(app)),
            }));

            const application = await getApplicationQuery.run(client);

            if (!application) {
                return c.json({ error: "Application not found" }, 404);
            }

            const getUserQuery = e.select(e.service.User, (user) => ({
                id: true,
                email: true,
                hashed_password: true,
                filter_single: e.all(
                    e.set(e.op(user.email, "=", body.email), e.op(user.application.id, "=", e.uuid(app))),
                ),
            }));

            const user = await getUserQuery.run(client);

            if (!user) {
                return c.json({ error: "User not found" }, 404);
            }

            if (user.hashed_password === null) {
                return c.json({ error: "Password sign in is not available for this user" }, 400);
            }

            const verified = await verify(user.hashed_password, body.password, {
                memoryCost: 19456,
                timeCost: 2,
                outputLen: 32,
                parallelism: 1,
            });

            if (!verified) {
                return c.json({ error: "Invalid password" }, 400);
            }

            const createSessionQuery = e.insert(e.service.Session, {
                user: e.select(e.service.User, (u) => ({ filter_single: e.op(u.id, "=", e.uuid(user.id)) })),
                expires_at: e.datetime(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
            });

            const getSessionQuery = e.select(createSessionQuery, () => ({
                id: true,
                expires_at: true,
            }));

            const session = await getSessionQuery.run(client);

            return c.json({ session });
        },
    )
    .post(
        "/:app/register",
        zValidator(
            "param",
            z.object({
                app: z.string().uuid(),
            }),
        ),
        zValidator(
            "json",
            z.object({
                email: z.string().email(),
                password: z.string(),
            }),
        ),
        async (c) => {
            const app = c.req.param("app");
            const body = c.req.valid("json");

            const getApplicationQuery = e.select(e.service.Application, (application) => ({
                id: true,
                filter_single: e.op(application.id, "=", e.uuid(app)),
            }));

            const application = await getApplicationQuery.run(client);

            if (!application) {
                return c.json({ error: "Application not found" }, 404);
            }

            const getUserQuery = e.select(e.service.User, (user) => ({
                id: true,
                email: true,
                filter_single: e.all(
                    e.set(e.op(user.email, "=", body.email), e.op(user.application.id, "=", e.uuid(app))),
                ),
            }));

            const user = await getUserQuery.run(client);

            if (user) {
                return c.json({ error: "User with this email already exists" }, 400);
            }

            const hashedPassword = await hash(body.password, {
                memoryCost: 19456,
                timeCost: 2,
                outputLen: 32,
                parallelism: 1,
            });

            const createUserQuery = e.insert(e.service.User, {
                email: body.email,
                hashed_password: hashedPassword,
                application: getApplicationQuery,
            });

            const getCreatedUserQuery = e.select(createUserQuery, () => ({
                id: true,
                email: true,
            }));

            const createdUser = await getCreatedUserQuery.run(client);

            const createSessionQuery = e.insert(e.service.Session, {
                user: e.select(e.service.User, (u) => ({ filter_single: e.op(u.id, "=", e.uuid(createdUser.id)) })),
                expires_at: e.datetime(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
            });

            const getSessionQuery = e.select(createSessionQuery, () => ({
                id: true,
                expires_at: true,
            }));

            const session = await getSessionQuery.run(client);

            return c.json({ session });
        },
    );
