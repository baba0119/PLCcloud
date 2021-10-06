
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ladderDisplayInitialState } from "../ladderEntity/ladderInitialState";
import { point } from "./ladderDisplayContext/ladderContextModel";

export const ladderCreateSlice = createSlice({
  name: 'ladderDisplay',
  initialState: ladderDisplayInitialState,
  reducers: {
    pointSelecter: (state, action: PayloadAction<point>) => {
      console.log(action.payload.x, action.payload.y);
    }
  }
});
