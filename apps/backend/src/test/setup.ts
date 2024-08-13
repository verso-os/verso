import { client, e } from "$backend/lib/database";

import { afterEach } from "vitest";

afterEach(async () => {
    await e.delete(e.Base).run(client);
});
