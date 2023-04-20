import { NextFunction, Request, Response } from "express"

export const checkauth = (req: Request, res: Response, next: NextFunction) => {
    if(req.headers['x-api-key'] === process.env.API_KEY || req.headers['x-api-key'] === process.env.VITE_PUBLIC_API_KEY) {
        next()
    } else {
        res.status(403).send('unauthorized')
    }
}

