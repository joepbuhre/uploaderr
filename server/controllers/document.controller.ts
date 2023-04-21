import { Router, Request, Response, Express } from "express";
import { logger } from "../utils/logger";
import multer from "multer";
import { MulterFile } from "../types";
import { saveDocument } from "../models/document.model";

export const handleSaveDocument = (
    files: MulterFile[] | { [key: string]: MulterFile[] }
): Promise<any> => {
    return new Promise((resolve, reject) => {
        Promise.all(
            Object.values(files).map((file: MulterFile) =>
                saveDocument({
                    buffer: file.buffer,
                    name: file.originalname,
                })
            )
        )
            .then((res) => {
                logger.debug(res);
                resolve(true);
            })
            .catch((err) => {
                logger.error(err);
                reject(err);
            });
    });
};
