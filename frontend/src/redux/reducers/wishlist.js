import { createReducer } from "@reduxjs/toolkit";

const getStoredWishlist = () => {
  try {
    return JSON.parse(window.localStorage.getItem("wishlistItems")) || [];
  } catch {
    return [];
  }
};

const initialState = {
  wishlist: getStoredWishlist(),
};

export const wishlistReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addToWishlist", (state, action) => {
      const item = action.payload;
      const isItemExist = state.wishlist.find((i) => i._id === item._id);

      if (isItemExist) {
        state.wishlist = state.wishlist.map((i) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        state.wishlist = [...state.wishlist, item];
      }

      window.localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlist)
      );
    })
    .addCase("removeFromWishlist", (state, action) => {
      state.wishlist = state.wishlist.filter((i) => i._id !== action.payload);
      window.localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlist)
      );
    });
});
