import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'redux/store';
import { IUser } from './types';

export interface MessageResponse {
  message: string;
}

interface ProfileResponse {
  data: IUser;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NX_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).userState;
      // console.log(getState() as RootState);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['user'],
  endpoints: (builder) => ({
    getUser: builder.query<ProfileResponse, null>({
      query() {
        return {
          url: 'user/profile',
        };
      },
    }),
  }),
});

export const { useGetUserQuery } = userApi;
