import { join } from "path";
import { logger } from "./logger";

export const getSavePath = (filename: string, upload_path_name: string | null = null): string => {
    // IMPORTANT! If multiple upload paths then that one takes presence over the single 
    // configured upload path
    if(Object.keys(process.env).filter(env => env.startsWith('UPLOAD_PATHS_')).length > 0) {
        logger.debug('Multiple upload paths are configured')
        
        let upload_path_value = null
        if(upload_path_name !== null ) {
            let full_upload_path_value = `UPLOAD_PATHS_${upload_path_name}`
            if (full_upload_path_value in process.env) {
                upload_path_value = process.env[full_upload_path_value]
                logger.debug(`Found a manual selected upload path [${upload_path_name}] with path [${upload_path_value}]`)
            } else {
                logger.warn(`A upload path name has been supplied but not been found in process.env (${upload_path_name})`)
            }
        }
        
    }

    if (process.env.UPLOAD_PATH === undefined) {
        logger.error("Environmental variable upload path has not been set");
        return "";
    }
    const path: string = process.env.UPLOAD_PATH;

    const fullPath = join(path, filename);

    return fullPath;
};
