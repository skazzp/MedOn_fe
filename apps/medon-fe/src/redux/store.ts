import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { server } from 'redux/features/backend/api';

export const store = configureStore({
  reducer: {
    [server.reducerPath]: server.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(server.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
