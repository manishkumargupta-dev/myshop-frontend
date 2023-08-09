import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // The item to add to the cart
      const newItem = action.payload;

      // Check if the item is already in the cart
      const foundInCart = state.cartItems.find(
        (item) => item._id === newItem._id
      );

      if (foundInCart) {
        // If exists, update quantity
        state.cartItems = state.cartItems.map((item) =>
          item._id === newItem._id ? newItem : item
        );
      } else {
        // If not exists, add new item to cartItems
        state.cartItems = [...state.cartItems, newItem];
      }
      updateCart(state);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;

      // Filter out the item to remove from the cart
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== productId
      );
      updateCart(state);
    },
  },
});

export default cartSlice;
