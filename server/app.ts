import express, { json, Request, Response, Router } from "express";
import cors from "cors";
import { logger } from "./utils/logger";
import document from "./routes/document";
import file from "./routes/file.route";
import health from "./routes/health.route";
import { checkauth } from "./controllers/auth.controller";
import auth from "./routes/auth.route";
import { getSavePath } from "./utils/helpers";
import { randomBytes } from "crypto";

const startApp = async (): Promise<Router> => {
    if(process.env.API_KEY === undefined || process.env.API_KEY === "") {
        logger.warn("API_KEY has not been set. Generating one ourselves. WATCH OUT: this changes on every restart")
        process.env.API_KEY = randomBytes(48).toString('hex')
        logger.warn(`api key is '${process.env.API_KEY}'`)
    }
    
    const router = Router();
    const app = express();

    router.use(cors());
    router.use(json());

    router.use("/health", health);

    router.use("/auth", auth);

    router.use(checkauth);

    router.use("/document", document);

    router.use("/file", file);

    app.use("/api", router);

    app.listen(process.env.BACKEND_PORT || 8080, () => {
        logger.debug(`Started backend on port ${process.env.BACKEND_PORT || 8080}🚀`);
    });
    
    return router;
};

export default startApp;
