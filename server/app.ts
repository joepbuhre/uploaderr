import { json, Request, Response, Router } from "express";
import cors from "cors";
import { logger } from "./utils/logger";
import document from "./routes/document";
import health from "./routes/health.route";
import { checkauth } from "./controllers/auth.controller";
import auth from "./routes/auth.route";

const startApp = async (): Promise<Router> => {
    const router = Router();

    router.use(cors());
    router.use(json());

    router.use("/health", health);

    router.use("/auth", auth);

    router.use(checkauth);

    router.use("/document", document);

    router.use("/api", router);

    return router;
};

export default startApp;
