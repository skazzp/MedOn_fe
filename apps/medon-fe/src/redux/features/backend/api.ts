import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IResetPassword, IForgetPassword } from 'redux/features/backend/types';

export const server = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NX_API_URL,
  }),
  endpoints: (builder) => ({
    postForgetPasswordDoctor: builder.mutation<string, IForgetPassword>({
      query: ({ email }) => ({
        url: 'auth/forget',
        method: 'POST',
        body: {
          email,
        },
      }),
    }),
    postResetPasswordDoctor: builder.mutation<string, IResetPassword>({
      query: ({ newPassword, token }) => ({
        url: 'auth/reset',
        method: 'POST',
        body: {
          newPassword,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  usePostForgetPasswordDoctorMutation,
  usePostResetPasswordDoctorMutation,
} = server;
