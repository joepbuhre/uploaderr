import { config } from "dotenv";
import startApp from "./app";
import { startEmail } from "./email";
import { logger } from "./utils/logger";
import startFrontend from "./frontend";
import express, { Router } from "express";

(() => {
    config({
        path: "./.env",
    });

    // Check modules and start apps
    let env = process.env;

    // Start backend
    if (env.MODULE_BACKEND === "true") {
        logger.debug("Backend module is enabled ✔️");
        startApp();
    } else {
        logger.debug("Backend is disabled");
    }

    // Start Frontend
    if (env.MODULE_FRONTEND === "true") {
        logger.debug("Frontend module is enabled ✔️");
        startFrontend();
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
})();
