import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkApi) => {
  const { currentPage, sortBy, order, category, search } = params;

  const res = await axios.get(
    `https://65ae6f121dfbae409a74d2c4.mockapi.io/pizzas?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );

  return res.data;
});

const initialState = {
  items: [],
  status: 'loading', // loading || success || error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const pizzaDataSelector = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
