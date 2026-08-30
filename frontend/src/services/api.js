import axios from "axios";

const API_URL = "http://localhost:8080/api";

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
            if (_tokenProvider) {
                // Use Auth0 token (primary path)
                const token = await _tokenProvider({
                    authorizationParams: {
                        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                    },
                });
                if (token) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                }
            } else {
                // Fallback: legacy localStorage token (local auth endpoints)
                const token = localStorage.getItem("token");
                if (token) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                }
            }
        } catch (err) {
            console.warn("Could not retrieve access token:", err.message);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor — handle 401 Unauthorized
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Unauthorized API call (401). Token may be expired or missing.");
            // Clear any legacy localStorage tokens on 401
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
        return Promise.reject(error);
    }
);

export default api;
