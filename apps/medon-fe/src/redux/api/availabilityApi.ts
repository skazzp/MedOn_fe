import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { prepareHeaders } from 'redux/api/utils/prepareHeaders';
import { IServerResponse } from 'interfaces/index';
import {
  AvailabilitySlot,
  UpdateAvailabilityDTO,
} from 'components/AvailabilityCalendar/types';
import { IAvailability } from './types';

export const availabilityApi = createApi({
  reducerPath: 'availabilityApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NX_API_URL,
    prepareHeaders,
  }),
  tagTypes: ['availability'],

  endpoints: (builder) => ({
    getAvailability: builder.query<
      IServerResponse<IAvailability[]>,
      { timezone?: string }
    >({
      query(dto: { timezone?: string }) {
        return {
          url: 'availability/all',
          method: 'POST',
          body: dto,
        };
      },
      providesTags: ['availability'],
    }),
    createAvailability: builder.mutation<
      IServerResponse,
      { dto: AvailabilitySlot[]; timezone: string }
    >({
      query(body: { dto: AvailabilitySlot[]; timezone: string }) {
        return {
          url: 'availability',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['availability'],
    }),
    removeAvailability: builder.mutation<
      IServerResponse,
      { dto: AvailabilitySlot[]; timezone: string }
    >({
      query(body: { dto: AvailabilitySlot[]; timezone: string }) {
        return {
          url: 'availability',
          method: 'DELETE',
          body,
        };
      },
      invalidatesTags: ['availability'],
    }),
    updateAvailability: builder.mutation<
      IServerResponse,
      UpdateAvailabilityDTO
    >({
      query(body: UpdateAvailabilityDTO) {
        return {
          url: 'availability',
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: ['availability'],
    }),
    getAvailabilityByDay: builder.mutation<
      IServerResponse<IAvailability[]>,
      { day: Date; timezone?: string }
    >({
      query: ({ day, timezone }) => ({
        url: 'availability/day',
        method: 'POST',
        body: { day, timezone },
      }),
      invalidatesTags: ['availability'],
    }),
  }),
});

export const {
  useCreateAvailabilityMutation,
  useGetAvailabilityQuery,
  useRemoveAvailabilityMutation,
  useUpdateAvailabilityMutation,
  useGetAvailabilityByDayMutation,
} = availabilityApi;
