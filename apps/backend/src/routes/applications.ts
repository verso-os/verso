import { client, e } from "$backend/lib/database";

import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

export const applications = new Hono()
    .get("/", async (c) => {
        const getApplicationsQuery = e.select(e.service.Application, () => ({
            id: true,
            name: true,
            created_at: true,
            updated_at: true,
        }));

        const applications = await getApplicationsQuery.run(client);

        return c.json(applications, 200);
    })
    .post(
        "/",
        zValidator(
            "json",
            z.object({
                name: z.string(),
            }),
        ),
        async (c) => {
            const body = c.req.valid("json");

            const createApplicationQuery = e.insert(e.service.Application, {
                name: body.name,
            });

            const getApplicationQuery = e.select(createApplicationQuery, () => ({
                id: true,
                name: true,
                created_at: true,
                updated_at: true,
            }));

            const application = await getApplicationQuery.run(client);

            return c.json(application, 200);
        },
    )
    .get(
        "/:app",
        zValidator(
            "param",
            z.object({
                app: z.string().uuid(),
            }),
        ),
        async (c) => {
            const getApplicationQuery = e.select(e.service.Application, (application) => ({
                id: true,
                name: true,
                created_at: true,
                updated_at: true,
                filter_single: e.op(application.id, "=", e.uuid(c.req.param("app"))),
            }));

            const application = await getApplicationQuery.run(client);

            if (!application) {
                return c.json({ error: "Application not found" }, 404);
            }

            return c.json(application, 200);
        },
    );
