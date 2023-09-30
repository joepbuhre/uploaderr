import { join } from "path";
import { logger } from "./logger";

export const getSavePath = (filename: string): string => {
    if (process.env.UPLOAD_PATH === undefined || process.env.UPLOAD_PATH === "") {
        logger.warn("Environmental variable upload path has not been set, defaulting to /tmp");
        process.env.UPLOAD_PATH = "/tmp"
    }
    const path: string = process.env.UPLOAD_PATH;

    const fullPath = join(path, filename);

    return fullPath;
};
