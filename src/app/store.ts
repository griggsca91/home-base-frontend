import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import garageReducer from '../features/garage/garageSlice';
import websocketMiddleware from '../features/websocket/middleware';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    garage: garageReducer
  },
  middleware: getDefaultMiddleware().concat(
    websocketMiddleware
  )
});

store.dispatch({type: "WS_CONNECT"})

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
