import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Room } from "../service/type";

interface RoomInitialState {
  rooms: Room[];
}

const initialState: RoomInitialState = {
  rooms: [],
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRooms(state, action: PayloadAction<Room[]>) {
      state.rooms = action.payload;
    },
  },
});

export const roomActions = roomSlice.actions;
export default roomSlice;
