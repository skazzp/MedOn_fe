import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import userReducer from 'redux/features/userSlice/userSlice';
import { authApi } from 'redux/api/authApi';
import { userApi } from 'redux/api/userApi';
import { patientApi } from 'redux/api/patientApi';
import { appointmentsApi } from 'redux/api/appointmentsApi';
import { availabilityApi } from './api/availabilityApi';

const persistConfig = {
  key: 'medon',
  storage,
  whitelist: ['token', 'isVerified'],
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [patientApi.reducerPath]: patientApi.reducer,
  [availabilityApi.reducerPath]: availabilityApi.reducer,
  [appointmentsApi.reducerPath]: appointmentsApi.reducer,
  userState: persistReducer(persistConfig, userReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      authApi.middleware,
      userApi.middleware,
      patientApi.middleware,
      availabilityApi.middleware,
      authApi.middleware,
      userApi.middleware,
      patientApi.middleware,
      appointmentsApi.middleware,
    ]),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export const persistedStore = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
