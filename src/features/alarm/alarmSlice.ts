import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum MessageType {
  default = -1,
  failed = 0,
  success = 1,
  warning = 2,
}

interface AlarmState {
  message: string;
  type: MessageType;
}

let initialState = {
  message: "message",
  type: MessageType.default,
} as AlarmState;

// immer will ensure mutable
const AlarmState = createSlice({
  name: "alarmState",
  initialState,
  reducers: {
    setAlarmAndShow(state, action: PayloadAction<AlarmState>) {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    setAlarmDefault(state, action: PayloadAction<MessageType>) {
      state.type = action.payload;
    },
  },
});

export const { setAlarmAndShow, setAlarmDefault } = AlarmState.actions;
export default AlarmState.reducer;
