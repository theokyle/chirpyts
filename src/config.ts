import { MigrationConfig } from "drizzle-orm/migrator";

process.loadEnvFile()

type APIConfig = {
    fileserverHits: number;
    db: DBConfig;
};

type DBConfig = {
    url: string;
    migrationConfig: MigrationConfig;
}

function envOrThrow(key: string) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Environment variable ${key} is not set`)
    }
    return value;
}

const migrationConfig: MigrationConfig = {
    migrationsFolder: "./src/db/migrations"
}

const dbConfig: DBConfig = {
    url: envOrThrow("DB_URL"),
    migrationConfig: migrationConfig
}

export const config: APIConfig = {
    fileserverHits: 0,
    db: dbConfig
};