"use client";

import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY ?? "",
  },
});

export const axiosGatewayClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_URL,
});

axiosClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
