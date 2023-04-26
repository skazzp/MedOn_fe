// only mock data

import { IPatient, PatientNote } from 'interfaces/patients';
import { Gender } from 'utils/constants';

export const patient: IPatient = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
  dateOfBirth: new Date('2000-01-01'),
  gender: Gender.Male,
  city: 'London',
  country: 'UK',
  phoneNumber: '555-555-5555',
  overview: 'Lorem ipsum dolor sit amet',
  createdAt: new Date('2022-09-28 13:45:00.000000'),
  updatedAt: new Date('2022-09-28 13:45:00.000000'),
};

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
