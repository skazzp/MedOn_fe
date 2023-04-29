import { Gender } from 'utils/constants/gender';

export interface ICreatePatient {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  country: string;
  dateOfBirth: Date;
  gender: Gender;
  phoneNumber: string;
  overview?: string;
}

export interface IPatient extends ICreatePatient {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPatientWithNotes {
  data?: IPatient & {
    notes: PatientNote[];
  };
}

export interface PatientNote {
  id: number;
  note: string;
  doctor: string;
  createdAt: string;
  updatedAt: string;
}
