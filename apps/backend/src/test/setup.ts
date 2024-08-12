import { client, e } from "$lib/database";

import { afterEach } from "vitest";

afterEach(async () => {
    await e.delete(e.Base).run(client);
});
