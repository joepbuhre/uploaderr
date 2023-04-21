import { join } from "path";
import { logger } from "./logger";

export const getSavePath = (filename: string): string => {
    if (process.env.UPLOAD_PATH === undefined) {
        logger.error("Environmental variable upload path has not been set");
        return "";
    }
    const path: string = process.env.UPLOAD_PATH;

    const fullPath = join(path, filename);

    return fullPath;
};
