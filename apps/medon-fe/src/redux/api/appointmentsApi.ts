import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from 'redux/api/utils/prepareHeaders';
import { IServerResponse } from 'interfaces/index';
import { Appointment } from './types';

export const appointmentsApi = createApi({
  reducerPath: 'appointmentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NX_API_URL,
    prepareHeaders,
  }),
  tagTypes: ['appointment'],
  endpoints: (builder) => ({
    getAppointmentsByPatientsId: builder.query<
      IServerResponse<Appointment[]>,
      string
    >({
      query: (id) => ({
        url: `appointments/patient/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAppointmentsByPatientsIdQuery } = appointmentsApi;

export const appointmentsApiReducer = appointmentsApi.reducer;
export const appointmentsApiMiddleware = appointmentsApi.middleware;
