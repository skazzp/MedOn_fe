import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from 'redux/api/utils/prepareHeaders';
import { IServerResponse, ICreatePatient, IPatient } from 'interfaces/index';

export const patientApi = createApi({
  reducerPath: 'patientApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NX_API_URL,
    prepareHeaders,
  }),
  tagTypes: ['patient'],
  endpoints: (builder) => ({
    createPatient: builder.mutation<IServerResponse<IPatient>, ICreatePatient>({
      query(dto: ICreatePatient) {
        return {
          url: 'patients',
          method: 'POST',
          body: dto,
        };
      },
    }),
  }),
});

export const { useCreatePatientMutation } = patientApi;
