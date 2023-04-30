import { configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware/socketMiddleware';
import { connect, disconnect, wsConnecting, onOpen, onClose, onMessage, wsError } from './actions/ws-orders-action';
import { rootReducer } from './reducers/index';

const wsActions = {
  connect: connect,
  disconnect: disconnect,
  wsConnecting: wsConnecting,
  wsError: wsError,
  onOpen: onOpen,
  onClose: onClose,
  onMessage: onMessage,
};

const webSocketMiddleware = socketMiddleware(wsActions)

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(webSocketMiddleware)
  }
});

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch;