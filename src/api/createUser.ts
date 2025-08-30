import { Request, Response } from "express";
import { respondWithJSON, respondWithError } from "./json.js";
import { BadRequestError } from "./errorhandler.js";
import { createUser } from "../db/queries/users.js";

export async function handlerCreateUser(req: Request, res: Response) {
    type parameters = {
        email: string;
    };

    const params = req.body;

    if (!params.email) {
        throw new BadRequestError("Missing required email");
    }

    const user = await createUser({email: params.email});

    if (!user) {
        throw new Error("Could not create user");
    }

    respondWithJSON(res, 201, {
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        email: user.email
    })
}