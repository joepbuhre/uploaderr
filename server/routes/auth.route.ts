import { Router, Request, Response } from "express";
import { logger } from "../utils/logger";

const auth = Router();

auth.get('/api-key', (req: Request, res: Response) => {
    res.send(process.env.API_KEY)
})

export default auth