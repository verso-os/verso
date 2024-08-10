import type { Hono } from "hono";
import cluster from "cluster";
import os from "os";
import { serve } from "@hono/node-server";

export const listen = (app: Hono, port: number = 9000) => {
    if (cluster.isPrimary) {
        const cores = os.cpus().length;

        for (let i = 0; i < cores; i++) {
            cluster.fork();
        }

        console.log(`Server is listening on port http://localhost:${port}`);

        cluster.on("exit", (worker) => {
            console.log(`Worker ${worker.process.pid} died`);
            cluster.fork();
        });
    } else {
        serve({
            fetch: app.fetch,
            port,
        });
    }
};
