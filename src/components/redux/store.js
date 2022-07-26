import { configureStore } from "@reduxjs/toolkit";
import { DummyDataReducer, UserDataReducer } from "./userSlice";

const store = configureStore({
  reducer: {
    dummy_data: DummyDataReducer,
    user_data: UserDataReducer,
  },
});

export default store;
