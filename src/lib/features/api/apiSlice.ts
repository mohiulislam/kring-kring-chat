import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    prepareHeaders: (headers) => {
      const JwtToken = localStorage.getItem("JwtToken");

      if ("JwtToken") {
        console.log(11111);

        headers.set(
          "authorization",
          `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vaGl1bGlzbGFtNUBnbWFpbC5jb20iLCJzdWIiOiI2NjYwMjdhYmE0MDgwZmRiZDM1MWYwNjYiLCJpYXQiOjE3MTc2NDA5MDAsImV4cCI6NTMxNzY0MDkwMH0.bZosuTQCbtYzvprDwE5Z8cj8cafpblNHnwta9Zdax_g`
        );
      }
      return headers;
    },
  }),

  endpoints: () => ({}),
});

export default apiSlice;
