import { Request, Response } from "express";
import { respondWithError, respondWithJSON } from "./json.js";
import { BadRequestError } from "./errorhandler.js";
import { createChirp, getChirp, getChirps } from "../db/queries/chirps.js";

export async function handlerCreateChirp(req: Request, res: Response) {
    type parameters = {
        body: string;
        userId: string;
    };
    
    const params: parameters = req.body;
    const maxChirpLength = 140;
    const profaneWords = ["kerfuffle", "sharbert", "fornax"]
    let cleanBody = "";

    if(params.body.length > maxChirpLength) {
        throw new BadRequestError("Chirp is too long. Max length is 140");
    } else {
        const splitBody = params.body.split(" ");
        for (let i=0; i < splitBody.length; i++){
            if (profaneWords.includes(splitBody[i].toLowerCase())){
                splitBody.splice(i, 1, "****")
            }
        }
        cleanBody = splitBody.join(" ");
    }

    const chirp = await createChirp({
        body: cleanBody,
        userId: params.userId
    })

    if (!chirp) {
        throw new Error("Could not create chirp")
    }

    respondWithJSON(res, 201, {
        id: chirp.id,
        createdAt: chirp.createdAt,
        updatedAt: chirp.updatedAt,
        body: chirp.body,
        userId: chirp.userId
    })
}

export async function handlerGetChirps(req: Request, res: Response) {
    const chirps = await getChirps();
    respondWithJSON(res, 200, chirps);
}

export async function handlerGetChirp(req: Request, res: Response) {
    const chirpId = req.params.chirpId
    
    const chirp = await getChirp(chirpId);

    if (!chirp) {
        respondWithError(res, 404, "Chirp not found");
    }

    respondWithJSON(res, 200, chirp);
}