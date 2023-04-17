import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { server } from 'redux/features/backend/api';
import { loginApi } from 'redux/api/loginApi'
import { authApi } from './api/authApi';
import { userApi } from './api/userApi';
import userReducer from './features/userSlice/userSlice';

export const store = configureStore({
  reducer: {
    [server.reducerPath]: server.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    userState: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      server.middleware,
      authApi.middleware,
      userApi.middleware,
      loginApi.middleware,
    ]),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
