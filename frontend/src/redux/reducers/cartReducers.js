import {
  CART_ADD_ITEM,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const cartReducers = (state = { cartItems: [] }, action) => {
  console.log(action.payload);
  switch (action.type) {
    case CART_ADD_ITEM:
      const newItem = action.payload;
      const existItem = state.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cartItems.map((x) => (x._id === existItem._id ? newItem : x))
        : [...state.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return { ...state, cartItems };

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x._id !== action.payload),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_EMPTY:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
