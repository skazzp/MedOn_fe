import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const server = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NX_API_URL,
  }),
  endpoints: (builder) => ({
    postForgetPasswordDoctor: builder.mutation<string, { email: string }>({
      query: ({ email }) => ({
        url: 'auth/forget',
        method: 'POST',
        body: {
          email,
        },
      }),
    }),
    postResetPasswordDoctor: builder.mutation<
      string,
      { newPassword: string; token: string }
    >({
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
