import type { Middleware } from 'redux';
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";
import { RootState } from '../store';

export type TwsActionTypes = {
  connect: ActionCreatorWithPayload<string>;
  wsConnecting: ActionCreatorWithoutPayload;
  disconnect: ActionCreatorWithoutPayload,
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onMessage: ActionCreatorWithPayload<any>;
  wsError: ActionCreatorWithPayload<string>;
};

export const socketMiddleware = (wsAction: TwsActionTypes): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let wsUrl = '';

    return next => (action) => {
    const { dispatch } = store;
    const { connect, wsConnecting, disconnect, onOpen, onClose, onMessage, wsError } = wsAction;

    if (connect.match(action)) {
      wsUrl = action.payload;
      socket = new WebSocket(wsUrl);
      isConnected = true;
      dispatch(wsConnecting());
    }

    if (socket) {
      
      socket.onopen = () => {
        dispatch(onOpen());
      };

      socket.onerror = err => {
        console.log(err);
      };

      socket.onmessage = event => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        //console.log(wsUrl, parsedData)
        dispatch(onMessage(parsedData));
      };

      socket.onclose = event => {
        if (event.code !== 1000) {
          dispatch(wsError(event.code.toString()));
        }
        if (isConnected) {
          dispatch(wsConnecting());
          reconnectTimer = window.setTimeout(() => {
            dispatch(connect(wsUrl));
          }, 3000);
        }
      };

      if (socket && disconnect.match(action)) {
        window.clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        dispatch(onClose());
        socket.close(1000);
        socket = null;
      }
    }
    next(action);
  };
  }
}; 