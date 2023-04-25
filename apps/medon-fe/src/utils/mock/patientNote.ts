// only mock data

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  address: string;
  phoneNumber: string;
  overview: string;
  createdAt: string;
  updatedAt: string;
}

export const patient: Patient = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
  dateOfBirth: '1990-01-01 00:00:00.000000',
  gender: 'male',
  address: '123 Main St',
  phoneNumber: '555-555-5555',
  overview: 'Lorem ipsum dolor sit amet',
  createdAt: '2022-09-28 13:45:00.000000',
  updatedAt: '2022-09-28 13:45:00.000000',
};

export interface PatientNote {
  id: number;
  note: string;
  doctor: string;
  createdAt: string;
  updatedAt: string;
}

export const patientNotes: PatientNote[] = [
  {
    id: 1,
    note: 'Patient has a history of heart disease',
    doctor: 'Lucas',
    createdAt: '2021-10-01 10:00:00',
    updatedAt: '2021-10-01 10:00:00',
  },
  {
    id: 2,
    note: 'Patient is allergic to penicillin',
    doctor: 'Matheus',
    createdAt: '2021-10-02 11:00:00',
    updatedAt: '2021-10-02 11:00:00',
  },
  {
    id: 3,
    note: 'Patient has a broken arm',
    doctor: 'Lucas',
    createdAt: '2021-10-03 12:00:00',
    updatedAt: '2021-10-03 12:00:00',
  },
  {
    id: 4,
    note: 'Patient recently had surgery',
    doctor: 'Matheus',
    createdAt: '2021-10-04 13:00:00',
    updatedAt: '2021-10-04 13:00:00',
  },
  {
    id: 5,
    note: 'Patient is pregnant',
    doctor: 'Maria',
    createdAt: '2021-10-05 14:00:00',
    updatedAt: '2021-10-05 14:00:00',
  },
];
