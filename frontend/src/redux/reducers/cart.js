import { createReducer } from "@reduxjs/toolkit";

const getStoredCart = () => {
  try {
    return JSON.parse(window.localStorage.getItem("cartItems")) || [];
  } catch {
    return [];
  }
};

const initialState = {
  cart: getStoredCart(),
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addToCart", (state, action) => {
      const item = action.payload;
      const isItemExist = state.cart.find((i) => i._id === item._id);

      if (isItemExist) {
        state.cart = state.cart.map((i) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        state.cart = [...state.cart, item];
      }

      window.localStorage.setItem("cartItems", JSON.stringify(state.cart));
    })
    .addCase("removeFromCart", (state, action) => {
      state.cart = state.cart.filter((i) => i._id !== action.payload);
      window.localStorage.setItem("cartItems", JSON.stringify(state.cart));
    })
    .addCase("clearCart", (state) => {
      state.cart = [];
      window.localStorage.setItem("cartItems", JSON.stringify(state.cart));
    });
});
