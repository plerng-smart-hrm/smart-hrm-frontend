"use server";

import { api } from "../util/api";
import { cookies } from "next/headers";
import { IApiResponse } from "@/types/admin";

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken?: string;
  user?: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    phoneNumber: string;
  };
}

export const loginService = async (
  loginRequest: ILoginRequest
): Promise<ILoginResponse> => {
  const data = await api.post<IApiResponse<ILoginResponse>>(
    `/auth/login`,
    loginRequest
  );
  console.log("res data", data);
  console.log("login service");

  const cookieStore = await cookies();
  cookieStore.set("accessToken", data.data.accessToken || "");

  return data.data;
};
