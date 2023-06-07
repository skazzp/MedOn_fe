import { PatientNote } from 'interfaces/patients';
import { Dispatch, SetStateAction } from 'react';

export interface IPatientNotesProps {
  notes: PatientNote[] | undefined;
  isFetching: boolean;
  total: number | undefined;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}
