import { Router, Request, Response, Express } from "express";
import { logger } from "../utils/logger";
import { saveFile } from "../models/file.model";
import { Server } from "@tus/server";
import { FileStore } from "@tus/file-store";
import { getSavePath } from "../utils/helpers";
import { config } from "dotenv";
import { randomBytes } from "crypto";

export const tusServer = () => {
    // TODO check to remove
    config({
        path: './.env'
    })
    return new Server({
        path: '/',
        datastore: new FileStore({ directory: getSavePath('')}),
        namingFunction(req) {
            if(req.headers.filename) {
                return req.headers.filename.toString()
            } else {
                return randomBytes(16).toString('hex').toString()
            }
        },
      })
}
