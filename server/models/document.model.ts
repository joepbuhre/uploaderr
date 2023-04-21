import { File, MulterFile } from "../types";
import { getSavePath } from "../utils/helpers";
import { logger } from "../utils/logger";
import fs from "fs";

export const saveDocument = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
        try {
            fs.writeFileSync(getSavePath(file.name), file.buffer);
            logger.debug(`wrote file to path: ${file.name}`);
            resolve(file.name);
        } catch (error: any) {
            logger.error(error);
            reject(error);
        }
    });
};
