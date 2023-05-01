import { PatientNote } from 'interfaces/patients';

export interface IPatientNotesProps {
  notes: PatientNote[] | undefined;
  isFetching: boolean;
  pageValue: number;
  pageSizeValue: number;
  total: number | undefined;
  setPageValue: React.Dispatch<React.SetStateAction<number>>;
  setPageSizeValue: React.Dispatch<React.SetStateAction<number>>;
}
