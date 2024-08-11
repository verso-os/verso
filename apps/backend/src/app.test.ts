import { app } from "$app";
import { test } from "@japa/runner";

test.group("GET /health", () => {
    test("returns 'ok'", async ({ expect }) => {
        const res = await app.request("/v1/health");
        expect(res.status).toBe(200);
        expect(await res.text()).toBe("ok");
    });
});
