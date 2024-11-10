import axios, { AxiosError } from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVICE_URL,
  signal: new AbortController().signal,
  timeout: 60000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      window.location.replace("/auth");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      window.location.replace("/");
    }
    return Promise.reject(error);
  }
);
