import { Group } from "@/interfaces/interfaces";
import apiSlice from "../apiSlice";

export const groupsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query<Group[], void>({
      query: () => "/groups",
    }),
  }),
});

export const { useGetGroupsQuery } = groupsApi;
