import { Router, Request, Response } from "express";
import { logger } from "../utils/logger";
import { handleGetToken } from "../controllers/auth.controller";

const auth = Router();

auth.get("/api-key", (req: Request, res: Response) => {
    res.send({
        token: handleGetToken("test"),
    });
});

export default auth;
