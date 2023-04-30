import { createReducer } from "@reduxjs/toolkit"
import { WebSocketStatus, TOrderFeed } from "../../types/types";
import { wsConnecting, wsError, onMessage, onOpen, onClose } from "../actions/ws-orders-action";

export const initialState: TOrderFeed = {
  status: WebSocketStatus.OFFLINE,
  connectionError: '',
  orders: [],
  total: 0,
  totalToday: 0
}

export const wsOrderSlice= createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebSocketStatus.CONNECTING;
    })
    .addCase(onOpen, (state) => {
 //     console.log('Profile connect open');
      state.status = WebSocketStatus.ONLINE;
      state.connectionError = '';
    })
    .addCase(wsError, (state, action) => {
      state.status = WebSocketStatus.ERROR;
      state.connectionError = 'error';
    })
    .addCase(onMessage, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    })
    .addCase(onClose, (state, action) => {
      state.status = WebSocketStatus.OFFLINE;
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
    })
})