import { Register, RegisterResponse } from "../../../../interfaces/interfaces";
import apiSlice from "../apiSlice";

export const registerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, Register>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerApi;
