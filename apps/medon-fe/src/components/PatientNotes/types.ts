import { PatientNote } from 'interfaces/patients';

export interface IPatientNotesProps {
  notes: PatientNote[] | undefined;
  isFetching: boolean;
  total: number | undefined;
}
