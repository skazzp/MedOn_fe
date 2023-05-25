import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IAppointmentsCardProps } from 'components/AppointmentsCard/types';

import { IServerResponse } from 'interfaces/serverResponse';

import { prepareHeaders } from 'redux/api/utils/prepareHeaders';

import { AppointmentRequest } from './types';

export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NX_API_URL,
    prepareHeaders,
  }),
  tagTypes: ['appointment'],
  endpoints: (builder) => ({
    getFutureAppointments: builder.query<
      IServerResponse<IAppointmentsCardProps[]>,
      AppointmentRequest
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
      providesTags: ['appointment'],
    }),
    getPastAppointments: builder.query<
      IServerResponse<IAppointmentsCardProps[]>,
      AppointmentRequest
    >({
      query({ offset = 0, limit }) {
        return {
          url: 'appointments/past',
          params: {
            offset,
            limit,
          },
        };
      },
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
      invalidatesTags: ['appointment'],
    }),
  }),
});

export const {
  useGetFutureAppointmentsQuery,
  useGetPastAppointmentsQuery,
  useSendLinkMutation,
} = appointmentApi;
