import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'redux/store';
import { ICreatePatient, IPatient, IServerResponse } from './types';

export const patientApi = createApi({
  reducerPath: 'patientApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NX_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).userState;

      if (token) headers.set('authorization', `Bearer ${token}`);
    },
  }),
  tagTypes: ['patient'],
  endpoints: (builder) => ({
    createPatient: builder.mutation<IServerResponse<IPatient>, ICreatePatient>({
      query(dto: ICreatePatient) {
        return {
          url: 'patients/add-new',
          method: 'POST',
          body: dto,
        };
      },
    }),
  }),
});

export const { useCreatePatientMutation } = patientApi;
