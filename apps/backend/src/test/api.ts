import { app } from "$backend/app";
import { testClient } from "hono/testing";

export const api = testClient(app);
