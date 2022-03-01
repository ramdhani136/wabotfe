import { configureStore } from "@reduxjs/toolkit";
import ModalReducer from "./slices/ModalSlice";

export const store = configureStore({
  reducer: {
    modal: ModalReducer,
  },
});
