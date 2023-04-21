import { Router, Request, Response } from "express";
import { logger } from "../utils/logger";

const health = Router();

health.use("/", (req: Request, res: Response) => {
    // If Post return posting
    if (req.method === "POST") {
        res.status(200).send(req.body);
    } else {
        res.status(200).send("OK");
    }
});

export default health;
