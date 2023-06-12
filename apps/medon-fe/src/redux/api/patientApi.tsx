import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from 'redux/api/utils/prepareHeaders';
import {
  IServerResponse,
  ICreatePatient,
  IPatient,
  PatientNote,
  GetPatientNotes,
  IUpdatePatient,
} from 'interfaces/index';
import {
  ICreatePatientNotes,
  IGetPatientNotes,
  IPatientsParams,
  IPatientsResponse,
} from './types';

export const patientApi = createApi({
  reducerPath: 'patientApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NX_API_URL,
    prepareHeaders,
  }),
  tagTypes: ['PatientsQuery', 'notes', 'patientInfo'],
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
    getPatients: builder.query<IPatientsResponse, IPatientsParams>({
      query: ({ page = 1, limit = 5, name = '' }) => ({
        url: 'patients/',
        params: { page, limit, name },
      }),
      providesTags: (result, error, arg) => [
        { type: 'PatientsQuery', page: arg.page },
        { type: 'PatientsQuery', limit: arg.limit },
      ],
    }),
    getPatientById: builder.query<IServerResponse<IPatient>, { id?: string }>({
      query: ({ id }) => `patients/${id}`,
      providesTags: ['patientInfo'],
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
      query: ({ text, order, id, limit, page }: IGetPatientNotes) => ({
        url: `patient-notes/${id}/`,
        params: { text, order, limit, page },
      }),
      providesTags: ['notes'],
    }),
    updatePatient: builder.mutation<IServerResponse<IPatient>, IUpdatePatient>({
      query(dto: IUpdatePatient) {
        return {
          url: `patients/update/${dto.id}`,
          method: 'PATCH',
          body: dto,
        };
      },
      invalidatesTags: ['patientInfo'],
    }),
    updatePatientNote: builder.mutation<
      IServerResponse<PatientNote>,
      { patientId: number; noteId: number; updatedNote: string }
    >({
      query({ patientId, noteId, updatedNote }) {
        return {
          url: `patient-notes/update/${patientId}/${noteId}`,
          method: 'PATCH',
          body: { note: updatedNote, patientId, noteId },
        };
      },
      invalidatesTags: ['notes'],
    }),
  }),
});

export const {
  useCreatePatientMutation,
  useGetPatientsQuery,
  useGetPatientByIdQuery,
  useCreatePatientNoteMutation,
  useGetPatientNotesQuery,
  useUpdatePatientMutation,
  useUpdatePatientNoteMutation,
} = patientApi;
