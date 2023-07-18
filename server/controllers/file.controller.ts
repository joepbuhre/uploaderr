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
        path: "./.env",
    });
    // Because of middleware in the file.route.ts we know what the headers were
    // We're now going to pass the header to the getSavePath function
    let location_name = null
    if(process.env.tus_req_headers && JSON.parse(process.env.tus_req_headers)['filelocation']) {
        let location_name = JSON.parse(process.env.tus_req_headers)['filelocation']
    }

    return new Server({
        path: "/",
        datastore: new FileStore({ directory: getSavePath("", location_name) }),
        namingFunction(req) {
            if (req.headers.filename) {
                return req.headers.filename.toString();
            } else {
                return randomBytes(16).toString("hex").toString();
            }
        },
        relativeLocation: true
    });
};
