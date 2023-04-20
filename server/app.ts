import express, { Request, Response, Router } from "express";
import cors from "cors";
import { logger } from "./utils/logger";
import document from "./routes/document";
import { startEmail } from "./email";
import { getSavePath } from './utils/helpers'
import { checkauth } from "./controllers/auth.controller";

const app = express();

const router = Router();

app.use(cors());
app.use(express.json());

app.use(checkauth)

router.use('/document', document)

app.use("/api", router);

const startApp = () => {

    app.listen(process.env.BACKEND_PORT || 8080, () => {
        logger.info(`Started backend on port ${process.env.BACKEND_PORT} 🚀`);
    });

}

export default startApp