import { SMTPServer } from "smtp-server";
import { AddressObject, simpleParser as parser } from "mailparser";
import fs from "fs";
import { logger } from "./utils/logger";
import { getSavePath } from "./utils/helpers";
import { checkIP } from "./models/auth.model";
import { saveDocument } from "./models/document.model";

let allowedFroms: Array<string>,
    allowedIP: Array<string>,
    allowedTo: Array<string>;

const server = new SMTPServer({
    onMailFrom(address, session, callback) {
        logger.debug(address, `mail from:`);
        if (
            allowedFroms.includes(address.address) &&
            checkIP(session.remoteAddress)
        ) {
            return callback();
        } else {
            return callback(
                new Error(
                    `Address "${address.address}" is not allowed to email to this address`
                )
            );
        }
    },
    onData(stream, session, callback) {
        parser(stream, {}, (err, parsed) => {
            if (err) console.log("Error:", err);

            if (parsed.to === undefined) {
                return callback();
            }
            let to: AddressObject = Array.isArray(parsed.to)
                ? parsed.to[0]
                : parsed.to;

            let allowed = false;
            for (let i = 0; i < to.value.length; i++) {
                const address = to.value[i].address || "";
                allowed = allowedTo.includes(address) || allowed;
            }

            if (allowed === false) {
                return callback(
                    new Error("Current email is not allowed to emailing to")
                );
            }

            if (process.env.UPLOAD_PATH) {
                for (let i = 0; i < parsed.attachments.length; i++) {
                    const attach = parsed.attachments[i];
                    let filename = attach.filename;

                    if (filename !== undefined) {
                        saveDocument({
                            name: filename,
                            buffer: parsed.attachments[0].content,
                        })
                            .then((res) => {})
                            .catch((err) => {
                                logger.error("Error with saving file");
                                return callback(err);
                            });
                    }
                }
            } else {
                logger.warn("upload path not configured");
            }

            return callback();
        });
    },
    disabledCommands: ["AUTH"],
});

export const startEmail = () => {
    let emailPort = parseInt(process.env?.EMAIL_PORT || "25");

    if (
        process.env.ALLOWED_FROM === undefined ||
        process.env.ALLOWED_TO === undefined
    ) {
        logger.error("Env variables are not set correctly");
        process.exit(1);
    }

    allowedFroms = process.env.ALLOWED_FROM.split(",");
    allowedTo = process.env.ALLOWED_TO.split(",");

    server.listen(emailPort, () => {
        logger.info(`Started smtp server on port ${emailPort}`);
    });
};
