import axios, { AxiosError } from "axios";

const api = axios.create({
    baseURL: "/api",
    headers: {
        "x-api-key": import.meta.env.VITE_PUBLIC_API_KEY,
    },
});

export { api };
