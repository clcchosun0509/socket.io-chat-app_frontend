import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authActions } from "../store/auth";
import { User } from "./type";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_SERVER_URL}/auth`, credentials: "include" }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    getMe: builder.query<User, null | void>({
      query: () => "/status",
      providesTags: ["Auth"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(authActions.setUser(data));
        } catch (error) {
          console.log("error", error);
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => "/logout",
      invalidatesTags: ["Auth"]
    })
  }),
});

export const { useGetMeQuery, useLogoutMutation } = authApi;
