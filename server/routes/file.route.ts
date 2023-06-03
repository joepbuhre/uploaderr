import { Router, Request, Response } from "express";
import { logger } from "../utils/logger";
import { tusServer } from "../controllers/file.controller";

const file = Router();

file.all(["/create", "/create/*"], tusServer().handle.bind(tusServer()))

export default file;
