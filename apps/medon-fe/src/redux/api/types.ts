import { Dayjs } from 'dayjs';
import { Gender } from 'utils/constants';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string | null;
  specialityId: number | null;
  photo: string;
  dateOfBirth: Date | null;
  isVerified: boolean;
  country: string | null;
  city: string;
  timeZone: string | null;
  id: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date | string;
  role: string;
  specialityId: number | null;
  country: string;
  city: string;
  timeZone: string | null;
}

export interface MessageResponse {
  message: string;
}

export interface UserResponse {
  user: IUser;
  token: string;
}

export interface Option {
  id: number | string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserDataResponse {
  data: IUser;
}

export interface UpdateProfileData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Dayjs | string;
  role: string | null;
  specialityId: number | null;
  country: string | null;
  city: string | null;
  timeZone: string | null;
}

export interface UpdateProfileResponse {
  data: UserResponse;
}

export interface LoginResponse {
  token: string;
  isVerified: boolean;
}

export interface IResetPassword {
  token?: string;
  newPassword: string;
}

export interface IForgetPassword {
  email: string;
}

export interface IPatientsParams {
  page?: number;
  limit?: number;
  name?: string;
}

interface IPatient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender;
  dateOfBirth: Date;
  country: string;
  city: string;
  phoneNumber: string;
  overview: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPatientsResponse {
  total: number;
  patients: IPatient[];
}

export interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface ICreatePatientNotes {
  patientId?: string;
  note: string;
}

export interface IGetPatientNotes {
  id?: string;
  order?: string;
  text?: string;
  page?: number;
  limit?: number;
}

export interface IAvailability {
  id: number;
  title: string;
  startTime: Date;
  endTime: Date;
  isAvailable: boolean;
  doctor: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    country: string;
    photo: string | null;
    dateOfBirth: string;
    role: string;
    isVerified: boolean;
    timeZone: string;
    specialityId: number;
    createdAt: string;
    updatedAt: string;
    speciality: {
      name: string;
    };
  };
}
export interface Appointment {
  id: number;
  date: Date;
  time: string;
  doctorId: number;
}
