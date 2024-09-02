import { client, e } from "$backend/lib/database";

import { Hono } from "hono";
import { getStartDate } from "$backend/util/getStartDate";
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
        zValidator(
            "query",
            z
                .object({
                    by: z
                        .union([
                            z.literal("created_at_day"),
                            z.literal("created_at_week"),
                            z.literal("created_at_month"),
                        ])
                        .optional(),
                    start: z.union([z.literal("week"), z.literal("month"), z.literal("year")]).optional(),
                })
                .superRefine((data, ctx) => {
                    const hierarchy = {
                        created_at_day: 1,
                        created_at_week: 2,
                        created_at_month: 3,
                        week: 2,
                        month: 3,
                        year: 4,
                    };

                    const { by, start } = data;

                    if (by && start && hierarchy[by] > hierarchy[start]) {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            message: "The 'by' unit cannot be larger than the 'start' unit.",
                            path: ["by"],
                        });
                    }
                }),
        ),
        async (c) => {
            const { by = "created_at_day", start = "week" } = c.req.valid("query");

            const getApplicationQuery = e.select(e.service.Application, (application) => ({
                id: true,
                name: true,
                created_at: true,
                updated_at: true,
                users_created: e.select(
                    e.group(
                        e.select(application.users, (u) => ({
                            filter: e.op(u.created_at, ">=", e.datetime(getStartDate(start))),
                        })),
                        (u) => ({
                            by: {
                                created_at: u[by],
                            },
                        }),
                    ),
                    (g) => ({
                        date: g.key.created_at,
                        count: e.count(g.elements),
                    }),
                ),
                filter_single: e.op(application.id, "=", e.uuid(c.req.param("app"))),
            }));

            const application = await getApplicationQuery.run(client);

            if (!application) {
                return c.json({ error: "Application not found" }, 404);
            }

            return c.json(
                {
                    ...application,
                    users_created: application.users_created.map((u) => ({
                        ...u,
                        date: u.date!,
                    })),
                },
                200,
            );
        },
    )
    .get(
        "/:app/users",
        zValidator(
            "param",
            z.object({
                app: z.string().uuid(),
            }),
        ),
        async (c) => {
            const query = e.select(e.service.Application, (application) => ({
                id: true,
                name: true,
                created_at: true,
                updated_at: true,
                users: e.select(e.service.User, (user) => ({
                    id: true,
                    email: true,
                    created_at: true,
                    updated_at: true,
                })),
                filter_single: e.op(application.id, "=", e.uuid(c.req.param("app"))),
            }));

            const result = await query.run(client);

            if (!result) {
                return c.json({ error: "Application not found" }, 404);
            }

            return c.json(result.users, 200);
        },
    );
