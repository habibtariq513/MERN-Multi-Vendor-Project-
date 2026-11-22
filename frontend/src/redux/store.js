import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated:
      window.localStorage.getItem("isAuthenticated") === "true",
  },
  reducers: {
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
      window.localStorage.setItem(
        "isAuthenticated",
        action.payload ? "true" : "false"
      );
    },
  },
});

export const { setAuthenticated } = userSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
