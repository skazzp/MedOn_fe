import { Dayjs } from 'dayjs';

export interface FormProfileData {
  firstName: string;
  lastName: string;
  email: string;
  role: string | null;
  birthday: Dayjs | null;
  country: string | null;
  city: string;
  timezone: string | null;
}

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  city: string;
  country: string;
  timeZone: string;
  isVerified: boolean;
  role: string;
  photo: string | null;
  specialityId: number | null;
}
