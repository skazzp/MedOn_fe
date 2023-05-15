import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Appointment } from './types'; 

export const appointmentsApi = createApi({
  reducerPath: 'appointmentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NX_API_URL,
  }),
  endpoints: (builder) => ({
    getAppointments: builder.query<Appointment[], void>({
      query: () => 'appointments',
    }),
    getAppointmentById: builder.query<Appointment, number>({
      query: (id) => `appointments/${id}`,
    }),
    createAppointment: builder.mutation<Appointment, Partial<Appointment>>({
      query: (appointment) => ({
        url: 'appointments',
        method: 'POST',
        body: appointment,
      }),
    }),
    deleteAppointment: builder.mutation<void, number>({
      query: (id) => ({
        url: `appointments/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useCreateAppointmentMutation,
  useDeleteAppointmentMutation,
} = appointmentsApi;

export const appointmentsApiReducer = appointmentsApi.reducer;
export const appointmentsApiMiddleware = appointmentsApi.middleware;
