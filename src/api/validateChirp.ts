import { Request, Response } from "express";
import { respondWithJSON, respondWithError } from "./json.js";
import { BadRequestError } from "./errorhandler.js";

export async function handlerValidateChirp(req: Request, res: Response) {
    type parameters = {
        body: string;
    };
    
    const params: parameters = req.body;
    const maxChirpLength = 140;
    const profaneWords = ["kerfuffle", "sharbert", "fornax"]

    if(params.body.length > maxChirpLength) {
        throw new BadRequestError("Chirp is too long. Max length is 140");
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