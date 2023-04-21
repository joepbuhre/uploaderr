import { Express } from "express";

type MulterFile = Express.Multer.File;

type File = {
    name: string;
    buffer: Buffer;
};
