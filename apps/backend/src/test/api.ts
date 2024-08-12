import { app } from "$app";
import { testClient } from "hono/testing";

export const api = testClient(app);
