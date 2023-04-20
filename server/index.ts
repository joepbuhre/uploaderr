import { config } from "dotenv";
import startApp from "./app";
import { startEmail } from "./email";
import { logger } from "./utils/logger";

;(function(){

    config({
        path: "./.env",
    });
    
    // Check modules and start apps
    let env = process.env

    // Start backend
    if(env.MODULE_BACKEND === 'true') {
        startApp()
    } else {
        logger.debug('Backend is disabled')
    }

    // Start email server
    if(env.MODULE_EMAIL === 'true') {
        startEmail()
    } else {
        logger.debug('Email is disabled')
    }

})()