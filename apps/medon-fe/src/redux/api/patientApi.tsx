import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from 'redux/api/utils/prepareHeaders';
import { IServerResponse, ICreatePatient, IPatient } from 'interfaces/index';
import { IPatientsParams, IPatientsResponse } from 'redux/api/types';

export const patientApi = createApi({
  reducerPath: 'patientApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NX_API_URL,
    prepareHeaders,
  }),
  tagTypes: ['PatientsQuery'],
  endpoints: (builder) => ({
    createPatient: builder.mutation<IServerResponse<IPatient>, ICreatePatient>({
      query(dto: ICreatePatient) {
        return {
          url: 'patients/',
          method: 'POST',
          body: dto,
        };
      },
      invalidatesTags: ['PatientsQuery'],
    }),
    getPatients: builder.query<IPatientsResponse, IPatientsParams>({
      query: ({ page = 1, limit = 5, searchPhrase = '' }) => ({
        url: 'patients/',
        params: { page, limit, searchPhrase },
      }),
      providesTags: (result, error, arg) => [
        { type: 'PatientsQuery', page: arg.page },
        { type: 'PatientsQuery', limit: arg.limit },
        { type: 'PatientsQuery', search: arg.searchPhrase },
      ],
    }),
  }),
});

export const { useCreatePatientMutation, useGetPatientsQuery } = patientApi;
