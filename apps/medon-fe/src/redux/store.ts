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

import { server } from 'redux/features/backend/api';
import { authApi } from 'redux/api/authApi';
import { userApi } from 'redux/api/userApi';
import userReducer from 'redux/features/userSlice/userSlice';

const persistConfig = {
  key: 'medon',
  storage,
  whitelist: ['token']
};

const rootReducer = combineReducers({
  [server.reducerPath]: server.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
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
      server.middleware,
      authApi.middleware,
      userApi.middleware,
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
