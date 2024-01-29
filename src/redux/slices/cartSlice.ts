import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
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
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    decrementItem(state, action: PayloadAction<string>) {
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

export const cartSelector = (state: RootState) => state.cart;
export const cartItemSelectorById = (id: string) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id);

export const { addItem, removeItem, decrementItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
