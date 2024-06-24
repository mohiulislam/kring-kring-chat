import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "@/axios/axiosInstance";

interface Message {
  user:  string;
  content: string;
  createdAt: Date;
}

interface GetMessagesParams {
  groupId: string;
  pageSize?: number;
  pageNumber?: number;
}

// Function to fetch messages from the API
async function fetchMessages({
  groupId,
  pageSize = 4,
  pageNumber = 1,
}: GetMessagesParams): Promise<Message[]> {
  const response = await apiClient.get(
    `/group/message?pageSize=${pageSize}&pageNumber=${pageNumber}&groupId=${groupId}`
  );
  return response.data;
}

export const useGetMessages = (params: GetMessagesParams) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["messages", params],
    queryFn: ({ pageParam = 1 }) =>
      fetchMessages({ ...params, pageNumber: pageParam }),
    getNextPageParam: (lastPage, pages) => {

      if (lastPage.length < params.pageSize!) {
        return undefined; 
      }
      return pages.length + 1;
    },
    getPreviousPageParam: (firstPage, pages) => {
      if (pages.length <= 1) {
        return undefined; 
      }
      return pages.length
      },
  });
};
