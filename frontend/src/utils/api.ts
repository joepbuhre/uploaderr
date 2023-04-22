import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

declare global {
    interface Window {
        VITE_PUBLIC_KEY: string;
    }
}

const api = axios.create({
    baseURL: "/api",
    headers: {
        "x-api-key": window.VITE_PUBLIC_KEY || "",
    },
});

export { api };
