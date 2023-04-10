export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string | null;
  speciality: string | null;
  photo: string;
  dateOfBirth: Date | null;
  is_verified: boolean;
  time_zone: string | null;
  id: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
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
  id: number;
  name: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

