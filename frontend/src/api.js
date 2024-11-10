import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import { logoutUser } from "./authSlice";
import store from './store'; // Import the Redux store

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor to add access token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors and token refresh
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        if (!refreshToken) {
            store.dispatch(logoutUser()); // Log out if there's no refresh token
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            return api.post('/api/token/refresh/', { refresh: refreshToken })
                .then((res) => {
                    if (res.status === 200) {
                        const newAccessToken = res.data.access;
                        localStorage.setItem(ACCESS_TOKEN, newAccessToken);

                        // Set Authorization header only on the original request
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                        // Retry the original request with the new token
                        return api(originalRequest);
                    }
                    return Promise.reject(error); // Reject if no new token is returned
                })
                .catch((refreshError) => {
                    store.dispatch(logoutUser()); // Log out if token refresh fails
                    return Promise.reject(refreshError);
                });
        }

        return Promise.reject(error);
    }
);

export default api;
