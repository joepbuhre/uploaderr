declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production";
            EMAIL_PORT: string;
            UPLOAD_PATH: string;
            ALLOWED_FROM: string;
            ALLOWED_TO: string;
            API_KEY: string;
            MODULE_EMAIL: "true" | "false";
            MODULE_FRONTEND: "true" | "false";
            MODULE_BACKEND: "true" | "false";
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
