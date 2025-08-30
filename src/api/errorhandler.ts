import { Request, Response, NextFunction } from "express";

// Status 400
export class BadRequestError extends Error {
    constructor(message: string) {
        super(message);
    }
}

// Status 401

export class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
    }
}

// Status 403

export class ForbiddenError extends Error {
    constructor(message: string) {
        super(message);
    }
}

// Status 404

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err);
    let status = 500;
    if (err instanceof BadRequestError) {
        status = 400;
    } else if (err instanceof UnauthorizedError) {
        status = 401;
    } else if (err instanceof ForbiddenError) {
        status = 403;
    } else if (err instanceof NotFoundError) {
        status = 404;
    } else {
        err.message = "Internal Server Error";
    }
    res.status(status).json({error: err.message})
}