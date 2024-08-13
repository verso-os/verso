import { describe, expect, test } from "vitest";

import { api } from "$backend/test/api";

describe("GET /health", () => {
    test("returns 'ok'", async () => {
        const res = await api.v1.health.$get();
        expect(res.status).toBe(200);
        expect(await res.text()).toBe("ok");
    });
});
