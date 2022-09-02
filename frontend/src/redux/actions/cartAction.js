import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const addToCart = (productId) => async (dispatch, getState) => {
  const existItem = getState().cart.cartItems.find((x) => x._id === productId);
  const quantity = existItem ? existItem.quantity + 1 : 1;
  const { data } = await axios.get(`/api/products/${productId}`);
  if (data.countInStock < quantity) {
    window.alert("Sorry, Product is out of stock");
    return;
  }
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      ...data,
      quantity: quantity,
    },
  });
  // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const updateCart = (item, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${item._id}`);
  if (data.countInStock < quantity) {
    window.alert("Sorry, Product is out of stock");
    return;
  }
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      ...item,
      quantity: quantity,
    },
  });
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
