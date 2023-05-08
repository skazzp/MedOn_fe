import { Dayjs } from 'dayjs';

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat: string;
  role: string;
  speciality: number | null;
  birthday: Dayjs;
  country: string;
  city: string;
  timezone: string;
}
