import express, { static as _static, Request, Response, Router } from "express";
import { logger } from "./utils/logger";
import { resolve } from "path";
import { randomBytes } from "crypto";

const startFrontend = (): void => {
    const router = Router();
    const app = express();

    // Check if we have a api key otherwise we set it here
    // TODO: can we always just set it here?
    process.env.VITE_PUBLIC_KEY = randomBytes(48).toString('hex')
    
    router.get("/env.js", (req: Request, res: Response) => {
        res.set({ "Content-Type": "text/javascript" }).send(
            `window.VITE_PUBLIC_KEY = "${process.env.VITE_PUBLIC_KEY}"`
        );
    });

    if (process.env.NODE_ENV === "production") {
        // Implement static
        router.use("/", _static(resolve(__dirname, "../frontend")));
    } else {
        logger.debug("Start frontend with `npm run dev:frontend`");
    }
    app.use(router).listen(process.env.FRONTEND_PORT || 5174);
};

export default startFrontend;
