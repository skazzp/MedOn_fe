import { Dayjs } from 'dayjs';

export interface FormProfileData {
  firstName: string;
  lastName: string;
  email: string;
  role: string | null;
  speciality: number | null;
  birthday: Dayjs | null;
  country: string | null;
  city: string;
  timezone: string | null;
}
