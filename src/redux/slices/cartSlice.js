import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, cur) => sum + cur.price * cur.count, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    decrementItem(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload);

      if (findItem) {
        if (findItem.count === 1) {
          state.items = state.items.filter((item) => item.id !== action.payload);
        } else {
          findItem.count--;
        }
        state.totalPrice = state.items.reduce((sum, cur) => sum + cur.price * cur.count, 0);
      }
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const cartSelector = (state) => state.cart;
export const cartItemSelectorById = (id) => (state) =>
  state.cart.items.find((item) => item.id === id);

export const { addItem, removeItem, decrementItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
