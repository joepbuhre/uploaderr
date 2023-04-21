import { config } from "dotenv";
import startApp from "./app";
import { startEmail } from "./email";
import { logger } from "./utils/logger";
import startFrontend from "./frontend";
import express, { Router } from "express";

(async () => {
    config({
        path: "./.env",
    });

    // Check modules and start apps
    let env = process.env;

    const app = express();
    const router = Router();

    // Start backend
    if (env.MODULE_BACKEND === "true") {
        logger.debug("Backend module is enabled ✔️");
        const backend = await startApp();

        router.use("/api", backend);
    } else {
        logger.debug("Backend is disabled");
    }

    // Frontend
    if (env.MODULE_FRONTEND === "true") {
        logger.debug("Frontend module is enabled ✔️");
        const frontend = await startFrontend();
        router.use("/", frontend);
    } else {
        logger.debug("Frontend is disabled");
    }

    // Start email server
    if (env.MODULE_EMAIL === "true") {
        logger.debug("Email module is enabled ✔️");
        startEmail();
    } else {
        logger.debug("Email is disabled");
    }

    app.use(router);
    // Start main application
    app.listen(process.env.APP_PORT || 8080, () => {
        logger.info(`Started application on port ${process.env.APP_PORT} 🚀`);
    });
})();
