import { Dayjs } from 'dayjs';

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
