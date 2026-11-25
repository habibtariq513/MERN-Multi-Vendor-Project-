export const addToCart = (data) => (dispatch, getState) => {
  dispatch({
    type: "addToCart",
    payload: data,
  });
  window.localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cart.cart)
  );
};

export const removeFromCart = (data) => (dispatch, getState) => {
  dispatch({
    type: "removeFromCart",
    payload: data._id || data.id,
  });
  window.localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cart.cart)
  );
};
