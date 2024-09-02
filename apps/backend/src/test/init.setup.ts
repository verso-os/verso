import { afterAll, beforeAll } from "vitest";

import createClient from "edgedb";

export const client = createClient();

beforeAll(async () => {
    // Silently try to drop the branch if it exists
    try {
        await client.execute(`drop branch test force;`);
    } catch (e) {}
    await client.execute(`create schema branch test from main;`);
});

afterAll(async () => {
    await client.execute(`drop branch test force;`);
});
