"use client";

import { axiosClient } from "../util/axios-client";

export interface RemoveUserReq {
  ip: string;
  port: number;
  userId: string;
}

export const deleteZkUser = async (req: RemoveUserReq) => {
  const params = new URLSearchParams({ ip: req.ip, port: String(req.port), userId: req.userId });
  return await axiosClient.delete(`/v1/zk/users?${params.toString()}`);
};
