import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Room } from "./type";

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_SERVER_URL}/room`, credentials: "include" }),
  tagTypes: ["Room"],
  endpoints: (builder) => ({
    getRooms: builder.query<Room[], null | void>({
      query: () => "/",
      providesTags: ["Room"],
    }),
    createRoom: builder.mutation<Room, string>({
      query: (title) => ({
        url: "/",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Room"],
    }),
  }),
});

export const { useGetRoomsQuery, useCreateRoomMutation } = roomApi;
