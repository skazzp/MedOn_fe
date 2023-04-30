import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from 'redux/api/utils/prepareHeaders';
import {
  IServerResponse,
  ICreatePatient,
  IPatient,
  PatientNote,
  GetPatientNotes,
} from 'interfaces/index';
import { ICreatePatientNotes, IGetPatientNotes } from './types';

export const patientApi = createApi({
  reducerPath: 'patientApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NX_API_URL,
    prepareHeaders,
  }),
  tagTypes: ['patient', 'notes'],
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
    getPatientById: builder.query<IServerResponse<IPatient>, { id?: string }>({
      query: ({ id }) => `patients/${id}`,
    }),

    createPatientNote: builder.mutation<
      IServerResponse<PatientNote>,
      ICreatePatientNotes
    >({
      query(dto: ICreatePatientNotes) {
        return {
          url: 'patient-notes/create',
          method: 'POST',
          body: dto,
        };
      },
      invalidatesTags: ['notes'],
    }),
    getPatientNotes: builder.query<
      IServerResponse<GetPatientNotes>,
      IGetPatientNotes
    >({
      query: ({ text, order, id, limit, page }) =>
        `patient-notes/${id}?text=${text}&order=${order}&limit=${limit}&page=${page}`,
      providesTags: ['notes'],
    }),
  }),
});

export const {
  useCreatePatientMutation,
  useGetPatientByIdQuery,
  useCreatePatientNoteMutation,
  useGetPatientNotesQuery,
} = patientApi;
