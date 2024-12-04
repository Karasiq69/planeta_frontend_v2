import axios, {AxiosError} from 'axios';
import {Mutex} from 'async-mutex';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError;
  }
}

const mutex = new Mutex();
const baseURL = process.env.NEXT_PUBLIC_HOST || 'http://localhost:8000';

const apiClient = axios.create({
    baseURL: `${baseURL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!mutex.isLocked()) {
                const release = await mutex.acquire();

                try {
                    // Send refresh request, refresh token automatically included via cookies
                    await apiClient.post(
                        `${baseURL}/api/jwt/refresh/`
                    );

                    // Retry the original request
                    return apiClient(originalRequest);
                } catch (refreshError) {
                    return Promise.reject(refreshError);
                } finally {
                    release();
                }
            } else {
                await mutex.waitForUnlock();
                return apiClient(originalRequest);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;