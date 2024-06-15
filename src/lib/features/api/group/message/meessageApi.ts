import { Message } from "@/interfaces/interfaces";
import apiSlice from "../../apiSlice";
import socket from "@/socket/socket";
import toast from "react-hot-toast";

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<
      Message[],
      { groupId: string; pageSize?: number; pageNumber?: number }
    >({
      query: ({ groupId, pageSize = 4, pageNumber = 1 }) =>
        `/group/message?pageSize=${pageSize}&pageNumber=${pageNumber}&groupId=${groupId}`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }
      ) {
        try {
          await cacheDataLoaded;
          socket.on("message", (data) => {
            const rootState = getState();
            if (rootState.group.groupId === data.group) {
              toast.success(JSON.stringify(data.content));
              updateCachedData((draft) => {});
            }
          });
        } catch {}
      },
    }),
  }),
});

export const { useGetMessagesQuery } = messagesApi;
