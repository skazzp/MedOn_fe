import { IAppointmentsCardProps } from 'components/AppointmentsCard/types';

export const appointmentCardMock: IAppointmentsCardProps[] = [
  {
    id: 123,
    link: '',
    startTime: new Date('2022-03-01T10:00:00Z'),
    endTime: new Date('2022-03-01T11:00:00Z'),
    remoteDoctor: {
      lastName: 'Smith',
    },
    patient: {
      dateOfBirth: new Date('1980-01-01'),
      firstName: 'John',
      lastName: 'Doe',
      gender: 'male',
      overview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  },
  {
    id: 124,
    link: '',
    startTime: new Date('2022-03-01T11:00:00Z'),
    endTime: new Date('2022-03-01T12:00:00Z'),
    remoteDoctor: {
      lastName: 'Smith',
    },
    patient: {
      dateOfBirth: new Date('1980-01-01'),
      firstName: 'John',
      lastName: 'Doe',
      gender: 'male',
      overview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  },
  {
    id: 125,
    link: 'http://www.google.com',
    startTime: new Date('2022-03-01T12:00:00Z'),
    endTime: new Date('2022-03-01T13:00:00Z'),
    remoteDoctor: {
      lastName: 'Smith',
    },
    patient: {
      dateOfBirth: new Date('1980-01-01'),
      firstName: 'John',
      lastName: 'Doe',
      gender: 'male',
      overview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  },
  {
    id: 126,
    link: '',
    startTime: new Date('2022-03-01T13:00:00Z'),
    endTime: new Date('2022-03-01T14:00:00Z'),
    remoteDoctor: {
      lastName: 'Smith',
    },
    patient: {
      dateOfBirth: new Date('1980-01-01'),
      firstName: 'John',
      lastName: 'Doe',
      gender: 'male',
      overview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  },
  {
    id: 127,
    link: '',
    startTime: new Date('2022-03-01T14:00:00Z'),
    endTime: new Date('2022-03-01T15:00:00Z'),
    remoteDoctor: {
      lastName: 'Smith',
    },
    patient: {
      dateOfBirth: new Date('1980-01-01'),
      firstName: 'John',
      lastName: 'Doe',
      gender: 'male',
      overview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  },
  {
    id: 128,
    link: 'http://www.google.com',
    startTime: new Date('2022-03-01T15:00:00Z'),
    endTime: new Date('2022-03-01T16:00:00Z'),
    remoteDoctor: {
      lastName: 'Smith',
    },
    patient: {
      dateOfBirth: new Date('1980-01-01'),
      firstName: 'John',
      lastName: 'Doe',
      gender: 'male',
      overview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  },
];
