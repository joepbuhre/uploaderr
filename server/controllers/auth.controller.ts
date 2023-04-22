import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { checkJWT } from "../models/auth.model";
import { logger } from "../utils/logger";

export const handleGetToken = (username: string) => {
    const token = jwt.sign(
        {
            username: username,
        },
        process.env.SECRET_KEY || "",
        {
            expiresIn: "1h",
        }
    );

    return token;
};

export const checkauth = (req: Request, res: Response, next: NextFunction) => {
    const key = <string>req.headers["x-api-key"];

    // TODO CHECK AUTH FLOW
    // if (key.split(" ")[0] === "Bearer") {
    //     logger.debug('Checking Bearer token')
    //     checkJWT(key.split(" ")[1])
    //         .then((res) => next())
    //         .catch((err) => {
    //             res.status(403).send(err);
    //         });
    //     return;
    // }

    if (key === process.env.API_KEY || key === process.env.VITE_PUBLIC_KEY) {
        next();
    } else {
        res.status(403).send("unauthorized");
    }
};
