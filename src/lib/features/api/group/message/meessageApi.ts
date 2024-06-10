import { Message } from "@/interfaces/interfaces";
import apiSlice from "../../apiSlice";
import socket from "@/socket/socket";
import toast from "react-hot-toast";

export const messgesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<
      Message[],
      { groupId: string; pageSize?: number; pageNumber?: number }
    >({
      query: ({ groupId, pageSize = 4, pageNumber = 1 }) =>
        `/group/message?pageSize=${pageSize}&pageNumber=${pageNumber}&groupId=${groupId}`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          socket.on("message", (data) => {
            toast.success(JSON.stringify(data.content));
            updateCachedData((draft) => {
              draft.push({
                user: data.user.userId,
                content: data.content,
                createdAt: data.createdAt,
              });
            });
          });
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
      },
    }),
  }),
});

export const { useGetMessagesQuery } = messgesApi;
