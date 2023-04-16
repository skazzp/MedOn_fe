import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser, LoginRequest } from 'redux/api/types';
import { setUser } from 'redux/features/userSlice/authSlice';

interface LoginResponse extends IUser {
  token: string;
}

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NX_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState() as LoginResponse;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: ({ email, password }) => ({
        url: 'auth/login',
        method: 'POST',
        body: { email, password },
      }),
      transformResponse: (response: LoginResponse) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response));
        setUser({ user: response, token: response.token });
        return response;
      },
    }),
  }),
});

export const { useLoginMutation } = loginApi;
