import * as jwt from "jsonwebtoken";
import { logger } from "../utils/logger";

export const checkIP = (ip: string): boolean => {
    // implement checks?
    return true;
};

export const checkJWT = (token: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET_KEY || "", (err: any, decoded: any) => {
            if (err) {
                logger.error(err, "Error with verifying token");
                reject(err);
                return;
            }
            resolve(decoded);
        });
    });
};
