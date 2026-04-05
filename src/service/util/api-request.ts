"use server";

import { cookies } from "next/headers";

const API_KEY = process.env.API_KEY!;
const API_BASE_URL = process.env.BACKEND_URL!;

export interface ApiOptions extends RequestInit {
  body?: any;
  params?: Record<string, any>;
}

export async function apiRequest<T = any>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  options: ApiOptions = {},
): Promise<T> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  let fullUrl = `${API_BASE_URL}${url}`;
  if (options.params) {
    const query = new URLSearchParams(options.params as Record<string, string>);
    fullUrl += `?${query.toString()}`;
  }
  const isFormData = options.body instanceof FormData;

  const headers = new Headers(options.headers);
  if (!isFormData) {
    headers.set("Content-Type", "application/json");
  }
  headers.set("X-API-KEY", API_KEY);
  headers.set("Authorization", `Bearer ${accessToken}`);

  console.info("===== Request =====");
  console.info("method: ", method);
  console.info("fullUrl: ", fullUrl);
  console.info("body: ", options.body);
  console.info("-----------------------");
  let body: BodyInit | undefined;

  if (method === "GET") {
    body = undefined;
  } else if (isFormData) {
    body = options.body;
  } else {
    body = JSON.stringify(options.body);
  }
  const response = await fetch(fullUrl, {
    ...options,
    method,
    headers,
    body,
  });

  // --- Handle non-OK responses ---
  if (!response.ok) {
    const text = await response.text();
    console.error(
      `API ${method} ${url} failed: ${text || response.statusText}`,
    );
    throw new Error(
      `API ${method} ${url} failed: ${text || response.statusText}`,
    );
  }

  // --- Try to parse JSON, otherwise return empty object ---
  try {
    return (await response.json()) as T;
  } catch {
    return {} as T;
  }
}
