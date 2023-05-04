import { PatientNote } from 'interfaces/patients';

export interface IPatientNotesProps {
  notes: PatientNote[] | undefined;
  isFetching: boolean;
  page: number;
  limit: number;
  total: number | undefined;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}
