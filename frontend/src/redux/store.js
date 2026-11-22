import { configureStore, createSlice } from "@reduxjs/toolkit";
import { sellerReducer } from "./reducers/seller.js";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated:
      window.localStorage.getItem("isAuthenticated") === "true",
    user: JSON.parse(window.localStorage.getItem("user") || "null"),
  },
  reducers: {
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
      window.localStorage.setItem(
        "isAuthenticated",
        action.payload ? "true" : "false"
      );
    },
    setUser(state, action) {
      state.user = action.payload;
      window.localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      window.localStorage.setItem("isAuthenticated", "false");
      window.localStorage.removeItem("user");
    },
  },
});

export const { setAuthenticated, setUser, logout } = userSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    seller: sellerReducer,
  },
});

export default store;
