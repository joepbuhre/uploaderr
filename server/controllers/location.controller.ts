import { fetchAllUploadLocations } from "../models/location.model";
import { logger } from "../utils/logger";

export const fetchUploadLocations = (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        resolve(fetchAllUploadLocations())
    });
};
