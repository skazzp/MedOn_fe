import { HttpStatus } from 'utils/constants/httpStatus';
import { Gender } from 'utils/constants/gender';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string | null;
  speciality: string | null;
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

export interface LoginResponse {
  token: string;
  isVerified: boolean;
}

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

export interface IServerResponse<T = undefined> {
  statusCode: HttpStatus;
  message?: string;
  data?: T;
}
