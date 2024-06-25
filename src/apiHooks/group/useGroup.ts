import apiClient from "@/axios/axiosInstance";
import { Group } from "@/interfaces/interfaces";
import queryClient from "@/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

async function fetchGroups(): Promise<Group[]> {
  const response = await apiClient.get("/groups");
  return response.data;
}

export function useGetGroups() {
  return useQuery({ queryKey: ["groups"], queryFn: fetchGroups });
}

async function createGroup(participantUserName: {
  participantUserName: string;
}) {
  const response = await apiClient.post("/groups", participantUserName);
  return response.data;
}

export function useCreateGroup() {
  return useMutation({
    mutationKey: ["createGroup"],
    mutationFn: createGroup,
    onSuccess: (data) => {
      queryClient.setQueryData(["groups"], (oldData: Group[]) => {
        toast.success("Group created successfully");
        return [...oldData, data];
      });
    },
  });
}
