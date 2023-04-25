import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  LoginResponse,
  LoginRequest,
  MessageResponse,
  Option,
  RegisterData,
} from 'redux/api/types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NX_API_URL,
  }),
  tagTypes: ['user'],
  endpoints: (builder) => ({
    registerUser: builder.mutation<MessageResponse, RegisterData>({
      query(data) {
        return {
          url: 'auth/signup',
          method: 'POST',
          body: data,
        };
      },
    }),
    resendEmail: builder.mutation<MessageResponse, string>({
      query(email) {
        return {
          url: `auth/re-confirm`,
          method: 'POST',
          body: { email },
        };
      },
    }),
    getSpecialities: builder.query<Option[], null>({
      query() {
        return {
          url: 'specialities',
        };
      },
    }),
    verifyEmail: builder.query<MessageResponse, { token: string | null }>({
      query({ token }) {
        return {
          url: `auth/confirm/${token}`,
        };
      },
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query({ email, password }) {
        return {
          url: `auth/login`,
          method: 'POST',
          body: { email, password },
        };
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useResendEmailMutation,
  useVerifyEmailQuery,
  useGetSpecialitiesQuery,
  useLoginMutation,
} = authApi;
