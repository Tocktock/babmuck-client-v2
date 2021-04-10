import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentUserState {
  isAuthenticated: boolean;
  username?: string;
  email: string;
  accessToken: string;
}

let initialState: CurrentUserState = {
  username: "",
  isAuthenticated: false,
  accessToken: "",
  email: "",
} as CurrentUserState;

// immer will ensure mutable
const UserStateSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    userAuthenticated(state, action: PayloadAction<CurrentUserState>) {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
  },
});

export const { userAuthenticated } = UserStateSlice.actions;
export default UserStateSlice.reducer;
