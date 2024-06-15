import apiClient from "@/axios/axiosInstance";
import { Group } from "@/interfaces/interfaces";
import { useQuery } from "@tanstack/react-query";

async function fetchGroups(): Promise<Group[]> {
  const response = await apiClient.get("/groups");
  return response.data;
}

export function useGetGroups() {
  return useQuery({ queryKey: ["groups"], queryFn: fetchGroups });
}
