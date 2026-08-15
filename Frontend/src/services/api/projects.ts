import { http } from "../http/client";
import type { Project } from "../../types/project";

function parseProjects(data: unknown, endpoint: string): Project[] {
  if (!Array.isArray(data)) {
    throw new TypeError(`Invalid projects response from ${endpoint}: expected an array.`);
  }

  return data as Project[];
}

export const getFeaturedProjects = async (): Promise<Project[]> => {
  const endpoint = "/Projects/featured";
  const response = await http.get<unknown>(endpoint);
  return parseProjects(response.data, endpoint);
};

export const getProjects = async (): Promise<Project[]> => {
  const endpoint = "/Projects";
  const response = await http.get<unknown>(endpoint);
  return parseProjects(response.data, endpoint);
};
