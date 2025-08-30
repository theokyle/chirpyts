import type {Request, Response, NextFunction} from 'express';
import {config} from '../config.js';

export function middlewareLogResponses(req: Request, res: Response, next: NextFunction) {
    res.on("finish", ()=> {
        const status = res.statusCode;
        if (status >= 400) {
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${status}`);
        }
    })

    next();
}

export function middlewareMetricsInc(req: Request, res: Response, next: NextFunction) {
    config.fileserverHits++;
    next();
}