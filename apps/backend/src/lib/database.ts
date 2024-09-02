import { createClient } from "edgedb";
import e from "$edgeql";

export const client = createClient({
    branch: process.env.NODE_ENV === "test" ? "test" : "main",
});
export { e };
