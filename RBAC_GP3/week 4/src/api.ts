import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig(); // Load environment variables

// Base URL configuration
const BASE_URL = process.env.API_BASE_URL || 'https://api.example.com';

// Create an Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for authorization token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken'); // Replace with your token storage logic
    if (token) {
      if (config.headers) {
        config.headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for centralized error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Helper functions for API requests
export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.get<T>(url, config);
  return response.data;
};

export const post = async <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.post<T>(url, data, config);
  return response.data;
};

export const put = async <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.put<T>(url, data, config);
  return response.data;
};

export const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.delete<T>(url, config);
  return response.data;
};

// Example usage functions
export const getDashboardData = async (): Promise<any> => {
  return get('/dashboard');
};

export const createItem = async (data: any): Promise<any> => {
  return post('/items', data);
};

export const updateItem = async (id: string, data: any): Promise<any> => {
  return put(`/items/${id}`, data);
};

export const deleteItem = async (id: string): Promise<any> => {
  return del(`/items/${id}`);
};

// Export the API client for advanced use cases
export default apiClient;