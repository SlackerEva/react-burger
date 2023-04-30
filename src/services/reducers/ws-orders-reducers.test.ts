import { wsOrderSlice, initialState } from './ws-orders-reducers';
import { onOpen, onClose, onMessage, wsError, wsConnecting } from "../actions/ws-orders-action";
import { WebSocketStatus } from "../../types/types";
import { TOrderData } from '../../types/types';

const orderData: TOrderData = {
  ingredients: [
     "643d69a5c3f7b9001cfa093d",
     "643d69a5c3f7b9001cfa093d",
     "643d69a5c3f7b9001cfa093e",
  ],
  _id: "644e64cf45c6f2001be6f3c2",
  status: "done",
  number: 2367,
  name: "Люминесцентный флюоресцентный бургер",
  createdAt: "2023-04-30T12:53:35.467Z",
  updatedAt: "2023-04-30T12:53:35.467Z",
};

describe('wsUserOrderReducer', () => {  
  it('should return the initial state', () => {
    expect(wsOrderSlice(undefined, {type: undefined})).toEqual(initialState);
  });

  it('should handle wsConnecting', () => {
    expect(wsOrderSlice(initialState, wsConnecting())).toEqual({
        ...initialState,
        status: WebSocketStatus.CONNECTING
    });
  });

  it('should handle onOpen', () => {
    expect(wsOrderSlice(initialState, onOpen())).toEqual({
        ...initialState,
        status: WebSocketStatus.ONLINE,
        connectionError: ''
    });
  });

  it('should handle wsError', () => {
    expect(wsOrderSlice(initialState, wsError('error'))).toEqual({
       ...initialState,
       status: WebSocketStatus.ERROR,
       connectionError: 'error'
    });
  });

  it('should handle onMessage', () => {
    const payload = {
      ...initialState,
      orders: [orderData],
      total: 2,
      totalToday: 1
    };
    const expectedState = {
      ...initialState,
      orders: payload.orders,
      total: payload.total,
      totalToday: payload.totalToday
    }
    expect(wsOrderSlice(initialState, onMessage(payload))).toEqual(expectedState);
  });

  it('should handle onClose', () => {
    expect(wsOrderSlice(initialState, onClose())).toEqual({
        status: WebSocketStatus.OFFLINE,
        connectionError: '',
        orders: [],
        total: 0,
        totalToday: 0
    });
  });
});