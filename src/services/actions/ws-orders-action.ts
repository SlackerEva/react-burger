import { createAction } from '@reduxjs/toolkit';
import { TOrderFeed } from "../../types/types";

export const connect = createAction<string, 'ORDERS_CONNECT'>('ORDERS_CONNECT');
export const disconnect = createAction('ORDERS_DISCONNECT');
export const wsConnecting = createAction('WS_ORDERS_CONNECTING');
export const onOpen = createAction('WS_ORDERS_OPEN');
export const onClose = createAction('WS_ORDERS_CLOSE');
export const onMessage = createAction<TOrderFeed, 'WS_ORDERS_MESSAGE'>('WS_ORDERS_MESSAGE');
export const wsError = createAction<string, 'WS_ORDERS_ERROR'>('WS_ORDERS_ERROR');