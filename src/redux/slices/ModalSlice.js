import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    data: {
      active: true,
      page: "createUser",
    },
  },
  reducers: {
    modalSet: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { modalSet } = modalSlice.actions;

export const selectModal = (state) => state.modal.data;

export default modalSlice.reducer;
