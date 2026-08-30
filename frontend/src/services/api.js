import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "https://localhost:8443/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

let _tokenProvider = null;

export function setTokenProvider(fn) {
    _tokenProvider = fn;
}

api.interceptors.request.use(
    async (config) => {
        try {
            if (!_tokenProvider) {
                return config;
            }

            const token = await _tokenProvider({
                authorizationParams: {
                    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                },
            });

            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        } catch (err) {
            console.warn("Could not retrieve access token:", err.message);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Unauthorized API call (401). Token may be expired or missing.");
        }
        return Promise.reject(error);
    }
);

export default api;
