import { createSlice } from '@reduxjs/toolkit';
import { fetchOrder } from '../actions/actions';

export const initialState = {
  orderNum: null,
  status: '',
}

export const ordersSlice = createSlice({
  name: 'orderNum',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderNum = null;
      state.status = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderNum = action.payload.order.number;
        //console.log(action.payload.order.number);
        state.status = "success";
      })
  },
})

export const { clearOrder } = ordersSlice.actions;
export default ordersSlice.reducer;