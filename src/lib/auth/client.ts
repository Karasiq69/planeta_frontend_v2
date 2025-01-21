import axios from 'axios';
import {Mutex} from 'async-mutex';

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

            await mutex.waitForUnlock();
            
            try {
                const response = await apiClient(originalRequest);
                return response;
            } catch (retryError) {
                if (!mutex.isLocked()) {
                    const release = await mutex.acquire();
                    try {
                        await apiClient.post(`/auth/jwt/refresh/`);
                        return apiClient(originalRequest);
                    } catch (refreshError) {
                        // document.cookie = 'access=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                        // window.location.href = '/';
                        return Promise.reject(refreshError);
                    } finally {
                        release();
                    }
                }
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;