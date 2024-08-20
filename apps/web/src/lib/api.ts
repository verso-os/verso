import { AppType } from "$backend/app";
import { hc } from "hono/client";

export const api = hc<AppType>("http://localhost:9000/", {
    init: {
        cache: "no-store",
    },
});
