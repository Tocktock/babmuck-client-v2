import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let initialState = {
  modalDisplay: "hidden",
};

// immer will ensure mutable
const ModalState = createSlice({
  name: "modalState",
  initialState,
  reducers: {
    toggleModalDisplay(state) {
      const nextModalState =
        state.modalDisplay === "hidden" ? "block" : "hidden";
      state.modalDisplay = nextModalState;
    },
  },
});

export const { toggleModalDisplay } = ModalState.actions;
export default ModalState.reducer;
