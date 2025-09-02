import {db} from "../index.js";
import { NewChirp, chirps } from "../schema.js";
import {asc, eq} from "drizzle-orm";

export async function createChirp(chirp: NewChirp) {
    const [result] = await db
        .insert(chirps)
        .values(chirp)
        .returning();
    return result;
}

export async function getChirps() {
    const results = await db.query.chirps.findMany({
        orderBy: [asc(chirps.createdAt)]
    });
    return results;
}

export async function getChirp(chirpId: string) {
    const [result] = await db.query.chirps.findMany({
        where: eq(chirps.id, chirpId)
    })

    return result;
}