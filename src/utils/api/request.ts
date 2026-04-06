"use client";

import axiosInstance from "./interceptor";
import { IApiParamsRequestUrlQuery } from "@/types/api";

const authorizationHeader = async () => {
  // const { token } = getAuthUser();
  const token = "";
  if (token)
    return {
      Authorization: "Bearer " + token,
    };
  else return null;
};

const getBaseHeaders = async () => {
  const authHeader: any = await authorizationHeader();
  return {
    ...authHeader,
  };
};

export const get = async <O>(urlPath: string, params?: any) => {
  try {
    const baseHeaders = await getBaseHeaders();
    const headers = {
      "Content-Type": "application/json",
      ...baseHeaders,
    };
    return await axiosInstance.get<O>(baseUrl(urlPath), { headers, params });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const post = async <I, O>(urlPath: string, data: I) => {
  try {
    return await axiosInstance.post<O>(baseUrl(urlPath), JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        ...(await getBaseHeaders()),
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const patch = async <I, O>(urlPath: string, data: I) => {
  try {
    return await axiosInstance.patch<O>(
      baseUrl(urlPath),
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
          ...(await getBaseHeaders()),
        },
      },
    );
  } catch (error) {
    return Promise.reject(error);
  }
};

export const filePost = async <I, O>(urlPath: string, data: I) => {
  try {
    return await axiosInstance.post<O>(baseUrl(urlPath), JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        responseType: "blob",
        ...(await getBaseHeaders()),
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const storeSession = async <I, O>(urlPath: string, data: I) => {
  return await axiosInstance.post<O>(urlPath, JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      ...(await getBaseHeaders()),
    },
  });
};

export const destroySession = async <O>(urlPath: string) => {
  return await axiosInstance.post<O>(urlPath, {
    headers: {
      "Content-Type": "application/json",
      ...(await getBaseHeaders()),
    },
  });
};

export const put = async <I, O>(urlPath: string, data: I) => {
  try {
    return await axiosInstance.put<O>(baseUrl(urlPath), JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        ...(await getBaseHeaders()),
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleted = async <O>(urlPath: string, data?: any) => {
  try {
    return await axiosInstance.delete<O>(baseUrl(urlPath), {
      params: data,
      headers: {
        "Content-Type": "application/json",
        ...(await getBaseHeaders()),
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const postMultipart = async <I, O>(urlPath: string, data: I) => {
  try {
    const baseHeaders = await getBaseHeaders();
    return await axiosInstance.post<O>(baseUrl(urlPath), data, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...baseHeaders,
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getDataTableUrlQueryString = async <O>({
  urlPath,
  pageNumber,
  pageSize,
  sort,
  search,
}: IApiParamsRequestUrlQuery) => {
  try {
    const baseHeaders = await getBaseHeaders();
    return await axiosInstance.get<O>(baseUrl(urlPath), {
      params: {
        page: pageNumber,
        limit: pageSize,
        sort: sort,
        search: search,
      },
      headers: {
        "Content-Type": "application/json",
        ...baseHeaders,
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

const baseUrl = (url: string) => {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`;
};
