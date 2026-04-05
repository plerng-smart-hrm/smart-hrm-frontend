"use client";

import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

const globalHeaders = {
  accept: 'application/json',
};

const axiosInstance: AxiosInstance = axios.create({
  timeout: 60000,
  withCredentials: true,
  transformRequest: [
    (data) => data,
  ],
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers = Object.assign({}, config.headers, globalHeaders);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // logoutAndRedirect()
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject(new Error('Network Error'));
    } else {
      return Promise.reject(error);
    }
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    // if (!navigator.onLine) {
    //   return Promise.reject(new Error('No internet connection'));
    // }
    config.headers = config.headers || ({} as Record<string, any>);
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
