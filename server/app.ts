import express, { json, Request, Response, Router } from "express";
import cors from "cors";
import { logger } from "./utils/logger";
import document from "./routes/document";
import health from "./routes/health.route";
import { checkauth } from "./controllers/auth.controller";
import auth from "./routes/auth.route";

const startApp = async (): Promise<Router> => {
    const router = Router();
    const app = express();

    router.use(cors());
    router.use(json());

    router.use("/health", health);

    router.use("/auth", auth);

    router.use(checkauth);

    router.use("/document", document);

    app.use("/api", router);

    app.listen(process.env.BACKEND_PORT || 8080, () => {
        logger.debug(`Started backend on port ${process.env.BACKEND_PORT || 8080}🚀`);
    });

    return router;
};

export default startApp;
