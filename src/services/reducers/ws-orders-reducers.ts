import { createReducer } from "@reduxjs/toolkit"
import { TOrderData, WebSocketStatus } from "../../types/types";
import { wsConnecting, wsError, onMessage, onOpen, onClose } from "../actions/ws-orders-action"

export type orderFeedStore = {
  status: WebSocketStatus;
  connectionError: string;
  orders: TOrderData[];
  ordersTotal: number;
  ordersTotalToday: number;
}

const initialState: orderFeedStore = {
  status: WebSocketStatus.OFFLINE,
  connectionError: '',
  orders: [],
  ordersTotal: 0,
  ordersTotalToday: 0
}

export const wsOrderSlice= createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebSocketStatus.CONNECTING;
    })
    .addCase(onOpen, (state) => {
      state.status = WebSocketStatus.ONLINE;
      state.connectionError = '';
    })
    .addCase(wsError, (state, action) => {
      state.status = WebSocketStatus.ERROR;
      state.connectionError = action.payload;
    })
    .addCase(onMessage, (state, action) => {
      state.orders = action.payload.orders;
      state.ordersTotal = action.payload.total;
      state.ordersTotalToday = action.payload.totalToday;
    })
    .addCase(onClose, (state, action) => {
      state.status = WebSocketStatus.OFFLINE;
      state.orders = [];
      state.ordersTotal = 0;
      state.ordersTotalToday = 0;
    })
})