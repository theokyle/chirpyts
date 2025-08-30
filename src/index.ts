import express from "express";
import { handlerReadiness } from "./api/readiness.js";
import { middlewareLogResponses, middlewareMetricsInc } from "./api/middleware.js";
import { handlerMetrics } from "./api/metrics.js";
import { handlerReset } from "./api/reset.js";
import { handlerValidateChirp } from "./api/validateChirp.js";
import { handlerCreateUser } from "./api/createUser.js";
import { errorHandler } from "./api/errorhandler.js";
import postgres from "postgres";
import { migrate} from "drizzle-orm/postgres-js/migrator";
import {drizzle} from "drizzle-orm/postgres-js";
import { config } from "./config.js";

const migrationClient = postgres(config.db.url, {max: 1})
await migrate(drizzle(migrationClient), config.db.migrationConfig)

const app = express();
const PORT = 8080;

app.use(middlewareLogResponses);
app.use("/app", middlewareMetricsInc, express.static("./src/app"));
app.use(express.json())

app.get("/api/healthz", handlerReadiness);
app.get("/admin/metrics", handlerMetrics);

app.post("/admin/reset", handlerReset);
app.post("/api/validate_chirp", handlerValidateChirp);
app.post("/api/users", handlerCreateUser);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})