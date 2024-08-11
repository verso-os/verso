import { describe, expect, test } from "vitest";

import { app } from "$app";
import { testClient } from "hono/testing";

const client = testClient(app);

describe("GET /health", () => {
    test("returns 'ok'", async () => {
        const res = await client.v1.health.$get();
        expect(res.status).toBe(200);
        expect(await res.text()).toBe("ok");
    });
});
