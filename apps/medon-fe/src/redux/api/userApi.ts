import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'redux/store';
import {
  UpdatePasswordData,
  UpdateProfileData,
  UpdateProfileResponse,
  UserDataResponse,
} from './types';

export interface MessageResponse {
  message: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NX_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).userState;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['user'],
  endpoints: (builder) => ({
    getUser: builder.query<UserDataResponse, null>({
      query() {
        return {
          url: 'user/profile',
        };
      },
      providesTags: ['user'],
    }),
    updateUser: builder.mutation<UpdateProfileResponse, UpdateProfileData>({
      query(data) {
        return {
          url: 'user/update',
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['user'],
    }),
    updatePhoto: builder.mutation<UpdateProfileResponse, FormData>({
      query(body) {
        return {
          url: 'user/update-photo',
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: ['user'],
    }),
    updateUserPassword: builder.mutation<MessageResponse, UpdatePasswordData>({
      query(data) {
        return {
          url: 'user/update-password',
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['user'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateUserPasswordMutation,
  useUpdatePhotoMutation,
} = userApi;
