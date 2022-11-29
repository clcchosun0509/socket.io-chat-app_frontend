import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "./type";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_SERVER_URL}/auth`, credentials: "include" }),
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => "/status",
    }),
  }),
});

export const { useGetMeQuery } = authApi;
