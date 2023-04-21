import { Router, Request, Response } from "express";
import { logger } from "../utils/logger";
import multer, { Multer } from "multer";
import { handleSaveDocument } from "../controllers/document.controller";
const mult = multer({ storage: multer.memoryStorage() });

const document = Router();

document.use("/create", mult.array("document"), (req: Request, res: Response) => {
    if (req.files) {
        handleSaveDocument(req.files);
        res.status(201).send("OK");
    } else {
        res.status(400).send("No files added");
        logger.error("No files added");
    }
});

export default document;
