import type {Request, Response} from 'express';
import { config } from '../config.js';
import { reset } from '../db/queries/users.js';
import { respondWithError } from './json.js';

export function handlerReset(req: Request, res: Response) {
    if (config.platform != "dev") {
        respondWithError(res, 403, "Forbidden")
    }
    config.fileserverHits = 0;
    res.write("Hits reset to 0");
    reset();
    res.end();
}

