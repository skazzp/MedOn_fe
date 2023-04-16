import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "redux/api/types";


const loginApi = createApi({
    reducerPath: 'auth/api',
    baseQuery: fetchBaseQuery({
      baseUrl: process.env.NX_API_URL || 'http://localhost:3333/'
    }),
    endpoints: (build) => ({
      login: build.mutation<IUser, { email: string, password: string }>({
        query: ({ email, password }) => ({
          url: 'auth/login',
          method: 'POST',
          body: { email, password },
        }),
      }),
    }),
  });

export const { useLoginMutation } = loginApi



