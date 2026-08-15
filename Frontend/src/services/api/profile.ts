import { http } from "../http/client";
import type { Profile } from "../../types/profile";

export const getProfile = async (): Promise<Profile> => {
  const response = await http.get<Profile>("/Profile");
  return response.data;
};
