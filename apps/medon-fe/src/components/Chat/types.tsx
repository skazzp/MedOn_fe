import { IUser } from 'redux/api/types';

export interface IChatProps {
  onSubmitMessage: (message: string) => void;
  history: ChatMessage[];
  reply: ChatMessage | null;
  user: IUser;
  patientFullName?: string;
}

export interface ICustomTimeStampProps {
  date: Date;
  isReply: boolean;
}

export interface Appointment {
  id: number;
  link: string;
  startTime: Date;
  endTime: Date;
  localDoctorId: number;
  remoteDoctorId: number;
  patientId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  country: string;
  password: string;
  token: string;
  photo: string;
  dateOfBirth: Date;
  role: 'local' | 'remote';
  isVerified: boolean;
  timeZone: string;
  specialityId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: number;
  value: string;
  appointment: Appointment;
  sender: Doctor;
  createdAt: Date;
  updatedAt: Date;
}
