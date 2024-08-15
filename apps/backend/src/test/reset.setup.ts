import { afterAll, beforeEach } from "vitest";
import { client, e } from "$backend/lib/database";

beforeEach(async () => {
    await e.delete(e.Base).run(client);
});

afterAll(async () => {
    await e.delete(e.Base).run(client);
});
