import { Request, Response } from "express";
import { respondWithJSON, respondWithError } from "./json.js";

export async function handlerValidateChirp(req: Request, res: Response) {
    type parameters = {
        body: string;
    };
    
    const params: parameters = req.body;
    const maxChirpLength = 140;
    const profaneWords = ["kerfuffle", "sharbert", "fornax"]

    if(params.body.length > maxChirpLength) {
        respondWithError(res, 400, "Chirp is too long");
        return;
    } else {
        const splitBody = params.body.split(" ");
        for (let i=0; i < splitBody.length; i++){
            if (profaneWords.includes(splitBody[i].toLowerCase())){
                splitBody.splice(i, 1, "****")
            }
        }
        const cleanBody = splitBody.join(" ");
        respondWithJSON(res, 200, {cleanedBody: cleanBody})
    }
}