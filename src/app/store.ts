import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import truckSlice from '../features/truck/truckSlice';
import { rootSaga } from "./rootSaga";
import createSagaMiddleware from "redux-saga";
import userSlice from '../features/user/userSlice';
import cargoTypeSlice from '../features/cargoType/cargoTypeSlice';
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    authReducer: authSlice,
    truckReducer:truckSlice,
    cargoTypeReducer:cargoTypeSlice,
   userReducer:userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
