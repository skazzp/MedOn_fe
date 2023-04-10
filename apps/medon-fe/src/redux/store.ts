import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { fetchDataApi } from './features/fetchData/fetchData';
import { authApi } from './api/authApi';
import { userApi } from './api/userApi';
import userReducer from './features/userSlice/userSlice';
import counterReducer from './features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    userState: userReducer,
    counter: counterReducer,
    [fetchDataApi.reducerPath]: fetchDataApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      fetchDataApi.middleware,
      authApi.middleware,
    ]),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
