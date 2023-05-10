import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from 'redux/api/utils/prepareHeaders';
import { IServerResponse } from 'interfaces/index';
import { AvailabilitySlot } from 'components/AvailabilityCalendar/types';
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
      query(data: { dto: AvailabilitySlot[]; timezone: string }) {
        return {
          url: 'availability',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['availability'],
    }),
    removeAvailability: builder.mutation<IServerResponse, AvailabilitySlot[]>({
      query(dto: AvailabilitySlot[]) {
        return {
          url: 'availability',
          method: 'DELETE',
          body: dto,
        };
      },
      invalidatesTags: ['availability'],
    }),
  }),
});

export const {
  useCreateAvailabilityMutation,
  useGetAvailabilityQuery,
  useRemoveAvailabilityMutation,
} = availabilityApi;
