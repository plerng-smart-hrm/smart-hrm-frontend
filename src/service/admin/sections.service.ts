"use server";

import { IApiResponse, ISection, IHoliday, IPagination } from "@/types/admin";
import { api } from "../util/api";

export interface ISectionsRes {
  sections?: ISection[];
  pagination?: IPagination;
}
export interface IHolidaysRes {
  holidays?: IHoliday[];
  pagination?: IPagination;
}

export interface ISectionRes {
  section?: ISection;
}

export interface ICreateSectionRequest {
  name?: string;
}

export interface IUpdateSectionRequest {
  name?: string;
}

export const getAllSections = async (
  pageIndex: number,
  pageSize?: number
): Promise<ISectionsRes> => {
  const page = pageIndex + 1;
  const data = await api.get<IApiResponse<ISection[]>>(
    `/sections?page=${page}&limit=${pageSize}`
  );
  return {
    sections: data.data,
    pagination: data.pagination,
  };
};

export const getSectionById = async (
  sectionId?: number
): Promise<ISectionRes> => {
  const data = await api.get<IApiResponse<ISection>>(`/sections/${sectionId}`);
  return {
    section: data.data,
  };
};

export const createSection = async (
  request: ICreateSectionRequest
): Promise<void> => {
  await api.post<IApiResponse<void>>(`/sections`, request);
};

export const updateSection = async (
  sectionId?: number,
  request?: IUpdateSectionRequest
): Promise<void> => {
  await api.patch<IApiResponse<void>>(`/sections/${sectionId}`, request);
};

export const deleteSection = async (sectionId?: number): Promise<void> => {
  await api.delete<IApiResponse<void>>(`/sections/${sectionId}`);
};
