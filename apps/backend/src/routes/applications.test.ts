import { describe, expect, test } from "vitest";

import { api } from "$backend/test/api";

describe("GET /app", () => {
    test("returns empty set when there are no applications", async () => {
        const res = await api.v1.app.$get();
        const text = await res.text();
        expect(res.status).toBe(200);
        expect(text).toBe("[]");
    });

    test("returns list of applications", async () => {
        await api.v1.app.$post({
            json: { name: "test" },
        });
        await api.v1.app.$post({
            json: { name: "test2" },
        });
        await api.v1.app.$post({
            json: { name: "test3" },
        });
        const res = await api.v1.app.$get();
        const json = await res.json();
        expect(res.status).toBe(200);
        expect(json.length).toBe(3);
        expect(json[0]).toMatchObject({ name: "test" });
        expect(json[1]).toMatchObject({ name: "test2" });
        expect(json[2]).toMatchObject({ name: "test3" });
    });
});

describe("POST /app", () => {
    test("creates an application", async () => {
        const res = await api.v1.app.$post({
            json: { name: "test" },
        });
        const application = await res.json();
        expect(res.status).toBe(200);
        expect(application).toMatchObject({ name: "test" });
    });
});

describe("GET /app/:app", () => {
    test("returns 404 when application does not exist", async () => {
        const res = await api.v1.app[":app"].$get({
            param: {
                app: "00000000-0000-0000-0000-000000000000",
            },
        });
        const json = await res.json();
        expect(res.status).toBe(404);
        expect(json).toMatchObject({ error: expect.any(String) });
    });

    test("returns application object matching the requested id", async () => {
        const appRes = await api.v1.app.$post({
            json: { name: "test" },
        });
        const appJson = await appRes.json();
        const res = await api.v1.app[":app"].$get({
            param: {
                app: appJson.id,
            },
        });
        const json = await res.json();
        expect(res.status).toBe(200);
        expect(json).toMatchObject({ name: "test" });
    });
});
