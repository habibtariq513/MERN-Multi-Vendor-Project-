import axios from "axios";
import { server } from "../../server.js";

export const loadUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${server}/user/get-user`, {
      withCredentials: true,
    });
    dispatch({ type: "user/setAuthenticated", payload: true });
    dispatch({ type: "user/setUser", payload: data.user });
  } catch (error) {
    dispatch({ type: "user/setAuthenticated", payload: false });
  }
};

export const updateUserInfo =
  (formData) => async (dispatch) => {
    const { data } = await axios.put(
      `${server}/user/update-user-info`,
      formData,
      { withCredentials: true }
    );
    dispatch({ type: "user/setUser", payload: data.user });
    dispatch(loadUser());
    return data;
  };

export const updateAvatar = (formData) => async (dispatch) => {
  const { data } = await axios.put(
    `${server}/user/update-avatar`,
    formData,
    { withCredentials: true }
  );
  dispatch({ type: "user/setUser", payload: data.user });
  dispatch(loadUser());
  return data;
};

export const updatUserAddress = (address) => async (dispatch) => {
  const { data } = await axios.put(
    `${server}/user/update-user-addresses`,
    address,
    { withCredentials: true }
  );
  dispatch({ type: "user/setUser", payload: data.user });
  dispatch(loadUser());
  return data;
};

export const deleteUserAddress = (id) => async (dispatch) => {
  const { data } = await axios.delete(
    `${server}/user/delete-user-address/${id}`,
    { withCredentials: true }
  );
  dispatch({ type: "user/setUser", payload: data.user });
  dispatch(loadUser());
  return data;
};
