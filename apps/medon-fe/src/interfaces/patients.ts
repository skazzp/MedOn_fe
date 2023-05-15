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

export interface PatientNote {
  id: number;
  note: string;
  doctor: {
    firstName?: string;
    lastName: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface GetPatientNotes {
  notes: PatientNote[];
  total: number;
}

export interface IUpdatePatient extends ICreatePatient {
  id: number;
}
