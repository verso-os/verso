import { beforeEach, describe, expect, test } from "vitest";

import { InferResponseType } from "hono/client";
import { api } from "$backend/test/api";

describe("POST /app/:app/register", () => {
    let application: InferResponseType<typeof api.v1.app.$post>;

    beforeEach(async () => {
        const res = await api.v1.app.$post({
            json: { name: "test" },
        });
        application = await res.json();
    });

    test("returns 404 when application does not exist", async () => {
        const res = await api.v1.app[":app"].register.$post({
            param: {
                app: "00000000-0000-0000-0000-000000000000",
            },
            json: {
                email: "test@test.com",
                password: "@Password123",
            },
        });
        const json = await res.json();

        expect(res.status).toBe(404);
        expect(json).toMatchObject({ error: expect.any(String) });
    });

    test("returns session when succesfully registered", async () => {
        const res = await api.v1.app[":app"].register.$post({
            param: {
                app: application.id,
            },
            json: {
                email: "test@test.com",
                password: "@Password123",
            },
        });

        const json = await res.json();

        expect(res.status).toBe(200);
        expect(json).toMatchObject({ session: { id: expect.any(String), expires_at: expect.any(String) } });
    });

    test("returns 400 when user with email already exists", async () => {
        await api.v1.app[":app"].register.$post({
            param: {
                app: application.id,
            },
            json: {
                email: "test@test.com",
                password: "@Password123",
            },
        });

        const res = await api.v1.app[":app"].register.$post({
            param: {
                app: application.id,
            },
            json: {
                email: "test@test.com",
                password: "@Password123",
            },
        });

        const json = await res.json();

        expect(res.status).toBe(400);
        expect(json).toMatchObject({ error: expect.any(String) });
    });
});

describe("POST /app/:app/login", () => {
    let application: InferResponseType<typeof api.v1.app.$post>;

    beforeEach(async () => {
        const res = await api.v1.app.$post({
            json: { name: "test" },
        });
        application = await res.json();
    });

    test("returns 404 when application does not exist", async () => {
        const res = await api.v1.app[":app"].login.$post({
            param: {
                app: "00000000-0000-0000-0000-000000000000",
            },
            json: {
                email: "test@test.com",
                password: "@Password123",
            },
        });
        const json = await res.json();

        expect(res.status).toBe(404);
        expect(json).toMatchObject({ error: expect.any(String) });
    });

    test("returns 404 when user does not exist", async () => {
        const res = await api.v1.app[":app"].login.$post({
            param: {
                app: application.id,
            },
            json: {
                email: "test@test.com",
                password: "@Password123",
            },
        });
        const json = await res.json();

        expect(res.status).toBe(404);
        expect(json).toMatchObject({ error: expect.any(String) });
    });

    test("returns session when succesfully logged in", async () => {
        await api.v1.app[":app"].register.$post({
            param: {
                app: application.id,
            },
            json: {
                email: "test@test.com",
                password: "@Password123",
            },
        });
        const res = await api.v1.app[":app"].login.$post({
            param: {
                app: application.id,
            },
            json: {
                email: "test@test.com",
                password: "@Password123",
            },
        });
        const json = await res.json();

        expect(res.status).toBe(200);
        expect(json).toMatchObject({ session: { id: expect.any(String), expires_at: expect.any(String) } });
    });

    test("returns error when password is incorrect", async () => {
        await api.v1.app[":app"].register.$post({
            param: {
                app: application.id,
            },
            json: {
                email: "test@test.com",
                password: "@Password123",
            },
        });
        const res = await api.v1.app[":app"].login.$post({
            param: {
                app: application.id,
            },
            json: {
                email: "test@test.com",
                password: "@WrongPassword123",
            },
        });
        const json = await res.json();

        expect(res.status).toBe(400);
        expect(json).toMatchObject({ error: expect.any(String) });
    });
});
