import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api/" : "/api",
    withCredentials: true, // Send cookies every single request
})