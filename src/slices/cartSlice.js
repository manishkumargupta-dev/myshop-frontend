import { createSlice } from "@reduxjs/toolkit";

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

      // Calculate the items price
      state.itemsPrice = Number(
        state.cartItems
          .reduce((acc, item) => acc + item.price * item.qty, 0)
          .toFixed(2)
      );

      // Calculate the shipping price | If items price is greater than 100, shipping is free | If not, shipping is 10
      state.shippingPrice = Number(
        (state.itemsPrice > 100 ? 0 : 10).toFixed(2)
      );

      // Calculate the tax price | Tax is 15% of the items price
      state.taxPrice = Number((0.15 * state.itemsPrice).toFixed(2));

      // Calculate the total price | Total price is the sum of the items price, shipping price and tax price
      state.totalPrice = Number(
        (state.itemsPrice + state.shippingPrice + state.taxPrice).toFixed(2)
      );

      // Save the cart to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;

      // Filter out the item to remove from the cart
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== productId
      );

      // Calculate the items price
      state.itemsPrice = Number(
        state.cartItems
          .reduce((acc, item) => acc + item.price * item.qty, 0)
          .toFixed(2)
      );

      // Calculate the shipping price | If items price is greater than 100, shipping is free | If not, shipping is 10
      state.shippingPrice = Number(
        (state.itemsPrice > 100 ? 0 : 10).toFixed(2)
      );

      // Calculate the tax price | Tax is 15% of the items price
      state.taxPrice = Number((0.15 * state.itemsPrice).toFixed(2));

      // Calculate the total price | Total price is the sum of the items price, shipping price and tax price
      state.totalPrice = Number(
        (state.itemsPrice + state.shippingPrice + state.taxPrice).toFixed(2)
      );

      // Save the cart to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export default cartSlice;
