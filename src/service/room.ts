import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Room } from "./type";

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_SERVER_URL}/room`, credentials: "include" }),
  tagTypes: ["Rooms", "Room"],
  endpoints: (builder) => ({
    getRoom: builder.query<Room, string>({
      query: (id) => `/${id}`,
      providesTags: ["Room"],
    }),
    getRooms: builder.query<Room[], null | void>({
      query: () => "/",
      providesTags: ["Rooms"],
    }),
    createRoom: builder.mutation<Room, string>({
      query: (title) => ({
        url: "/",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Rooms"],
    }),
  }),
});

export const { useGetRoomQuery, useGetRoomsQuery, useCreateRoomMutation } = roomApi;
