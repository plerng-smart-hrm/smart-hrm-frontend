"use server";

import { IApiResponse } from "@/types/admin";
import { api } from "../util/api";
import { TerminationValues } from "@/schemas/admin/termination";

export const createTermination = async (request: TerminationValues) => {
  return await api.post<IApiResponse<void>>(`/v1/terminations`, request);
};

export const updateTermination = async (id?: number, request?: TerminationValues) => {
  return await api.patch<IApiResponse<void>>(`/v1/terminations/${id}`, request);
};

export const deleteTermination = async (id?: number) => {
  return await api.delete<IApiResponse<void>>(`/v1/terminations/${id}`);
};
