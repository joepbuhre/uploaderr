import { Router, Request, Response } from "express";
import { logger } from "../utils/logger";
import { fetchUploadLocations } from "../controllers/location.controller";

const location = Router();

location.get('/', (req: Request, res: Response) => {
    fetchUploadLocations()
        .then(resp => {
            res.send(resp)
        })
        .catch(err => {
            res.end('something went wrong')
        })
})

export default location;
