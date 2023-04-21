import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const api = axios.create({
    baseURL: "/api",
    headers: {
        "x-api-key": import.meta.env.VITE_PUBLIC_KEY,
    },
});

export { api };
