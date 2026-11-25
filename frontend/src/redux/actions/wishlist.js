export const addToWishlist = (data) => (dispatch, getState) => {
  dispatch({
    type: "addToWishlist",
    payload: data,
  });
  window.localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlist)
  );
};

export const removeFromWishlist = (data) => (dispatch, getState) => {
  dispatch({
    type: "removeFromWishlist",
    payload: data._id || data.id,
  });
  window.localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlist)
  );
};
