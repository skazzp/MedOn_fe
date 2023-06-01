import { IAppointmentsCardProps } from 'components/AppointmentsCard/types';

import { IServerResponse } from 'interfaces/index';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from 'redux/api/utils/prepareHeaders';

import {
  Appointment,
  AppointmentCalendarRequest,
  AppointmentFutureRequest,
  AppointmentListRequest,
} from './types';

export const appointmentsApi = createApi({
  reducerPath: 'appointmentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NX_API_URL,
    prepareHeaders,
  }),
  tagTypes: ['appointment', 'appointments'],
  endpoints: (builder) => ({
    getAppointments: builder.query<
      IServerResponse<Appointment[]>,
      { timezone?: string }
    >({
      query: (dto: { timezone?: string }) => ({
        url: 'appointments/all',
        method: 'GET',
        body: dto,
      }),
      providesTags: ['appointment'],
    }),
    getAppointmentById: builder.query<Appointment, number>({
      query: (id) => ({
        url: `appointments/${id}`,
        method: 'GET',
      }),
    }),
    createAppointment: builder.mutation<
      IServerResponse,
      { dto: Appointment; timezone: string }
    >({
      query: (body: { dto: Appointment; timezone: string }) => ({
        url: 'appointments',
        method: 'POST',
        body: { ...body.dto, timezone: body.timezone },
      }),
      invalidatesTags: ['appointment'],
    }),
    deleteAppointment: builder.mutation<void, number>({
      query: (id) => ({
        url: `appointments/${id}`,
        method: 'DELETE',
      }),
    }),
    getAppointmentsByPatientsId: builder.query<
      IServerResponse<Appointment[]>,
      string
    >({
      query: (id) => ({
        url: `appointments/patient/${id}`,
        method: 'GET',
      }),
    }),
    getFutureAppointments: builder.query<
      IServerResponse<IAppointmentsCardProps[]>,
      AppointmentFutureRequest
    >({
      query({ offset = 0, limit }) {
        return {
          url: 'appointments/future',
          params: {
            offset,
            limit,
          },
        };
      },
      providesTags: ['appointments'],
    }),
    getAllListAppointments: builder.query<
      IServerResponse<IAppointmentsCardProps[]>,
      AppointmentListRequest
    >({
      query({ filter, page = 1, showAll }) {
        return {
          url: 'appointments/list',
          params: {
            filter,
            page,
            showAll,
          },
        };
      },
      providesTags: ['appointments'],
    }),
    getAllCalendarAppointments: builder.query<
      IServerResponse<IAppointmentsCardProps[]>,
      AppointmentCalendarRequest
    >({
      query({ showAll }) {
        return {
          url: 'appointments/calendar',
          params: {
            showAll,
          },
        };
      },
      providesTags: ['appointments'],
    }),
    sendLink: builder.mutation<
      IServerResponse<void>,
      { link: string; id: string }
    >({
      query({ link, id }) {
        return {
          url: `appointments/link/${id}`,
          method: 'PATCH',
          body: { link },
        };
      },
      invalidatesTags: ['appointments'],
    }),
    getActiveAppointmentByDoctorId: builder.query<
      IServerResponse<Appointment>,
      number | null
    >({
      query: (id) => {
        if (!id) throw new Error('params is not provided!');

        return {
          url: `appointments/active/${id}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useCreateAppointmentMutation,
  useDeleteAppointmentMutation,
  useGetAppointmentsByPatientsIdQuery,
  useGetActiveAppointmentByDoctorIdQuery,
  useGetFutureAppointmentsQuery,
  useSendLinkMutation,
  useGetAllListAppointmentsQuery,
  useGetAllCalendarAppointmentsQuery,
} = appointmentsApi;

export const appointmentsApiReducer = appointmentsApi.reducer;
export const appointmentsApiMiddleware = appointmentsApi.middleware;
