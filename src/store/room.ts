import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Room } from "../service/type";

interface RoomInitialState {
  rooms: Room[];
  currentRoomId: string | null;
}

const initialState: RoomInitialState = {
  rooms: [],
  currentRoomId: null,
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
