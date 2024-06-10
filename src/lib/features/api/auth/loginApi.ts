import { Login, LoginResponse } from "../../../../interfaces/interfaces";
import apiSlice from "../apiSlice";

export const loginApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, Login>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body: body,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("user", JSON.stringify(data));
        } catch (error) {
          console.error("Login failed: ", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = loginApi;
