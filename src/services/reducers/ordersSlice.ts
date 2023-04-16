import { createSlice } from '@reduxjs/toolkit';
import { fetchOrder } from '../actions/actions';

const initialState = {
  orders: [],
  status: '',
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orders = [];
      state.status = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
        console.log(action.payload);
        state.status = "success";
      })
  },
})

export const { clearOrder } = ordersSlice.actions;
export default ordersSlice.reducer;