import axios from "axios";
import { server } from "../../server.js";

export const createevent = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const { data } = await axios.post(
      `${server}/event/create-event`,
      newForm,
      config
    );
    dispatch({
      type: "eventCreateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload:
        error.response?.data?.message ||
        error.message ||
        "Unable to create event",
    });
  }
};

export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsShopRequest",
    });

    const { data } = await axios.get(
      `${server}/event/get-all-events/${id}`
    );
    dispatch({
      type: "getAllEventsShopSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsShopFailed",
      payload:
        error.response?.data?.message ||
        error.message ||
        "Unable to load shop events",
    });
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteEventRequest",
    });

    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "deleteEventSuccess",
      payload: data.message,
    });
    return true;
  } catch (error) {
    dispatch({
      type: "deleteEventFailed",
      payload:
        error.response?.data?.message ||
        error.message ||
        "Unable to delete event",
    });
    return false;
  }
};
