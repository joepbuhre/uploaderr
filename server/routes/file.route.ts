import { Router, Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { tusServer } from "../controllers/file.controller";

const file = Router();

// We need to set the variables in process env
file.use('*', (req: Request, res: Response, next: NextFunction) => {
    process.env.tus_req_headers = JSON.stringify(req.headers)
    next()
})

file.all(["/", "/*"], tusServer().handle.bind(tusServer()))

export default file;
