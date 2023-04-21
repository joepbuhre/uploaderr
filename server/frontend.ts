import { static as _static, Request, Response, Router } from "express";
import { logger } from "./utils/logger";
import { resolve } from "path";
import fs from 'fs'

const startFrontend = async (): Promise<Router> => {
    const router = Router();

    router.get('/env.js', (req: Request, res: Response) => {
        res.set({'Content-Type': 'text/javascript'}).send(`window.VITE_PUBLIC_KEY = "${process.env.VITE_PUBLIC_KEY}"`)
    })

    // Implement static
    if (process.env.NODE_ENV === "production") {
        router.use("/", _static(resolve(__dirname, "../frontend")));

    } else if (process.env.NODE_ENV === "development") {
        await import("express-http-proxy").then((proxy) => {
            router.use("/", proxy.default("http://localhost:5173"));
            logger.debug("Development is enabled, serving reverse proxy");
        });
    }

    return Promise.resolve(router);
};

export default startFrontend;
