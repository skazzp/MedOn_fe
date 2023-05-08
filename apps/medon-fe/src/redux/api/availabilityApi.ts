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
    createAvailability: builder.mutation<IServerResponse, AvailabilitySlot[]>({
      query(dto: AvailabilitySlot[]) {
        return {
          url: 'availability',
          method: 'POST',
          body: dto,
        };
      },
    }),
    getAvailability: builder.query<IServerResponse<IAvailability[]>, null>({
      query() {
        return {
          url: 'availability',
        };
      },
    }),
  }),
});

export const { useCreateAvailabilityMutation, useGetAvailabilityQuery } =
  availabilityApi;
