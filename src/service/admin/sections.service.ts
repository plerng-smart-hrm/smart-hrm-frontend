"use server";

import { IApiResponse } from "@/types/admin";
import { api } from "../util/api";

export interface ICreateSectionRequest {
  name?: string;
}

export interface IUpdateSectionRequest {
  name?: string;
}

export const createSection = async (request: ICreateSectionRequest): Promise<void> => {
  await api.post<IApiResponse<void>>(`/v1/sections`, request);
};

export const updateSection = async (sectionId?: number, request?: IUpdateSectionRequest): Promise<void> => {
  await api.patch<IApiResponse<void>>(`/v1/sections/${sectionId}`, request);
};

export const deleteSection = async (sectionId?: number): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/v1/sections/${sectionId}`);
};
