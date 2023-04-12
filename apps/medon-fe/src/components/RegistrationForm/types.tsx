import  { Dayjs } from 'dayjs';

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat: string;
  role: string | null;
  speciality: number | null;
  birthday: Dayjs | null;
  country: string | null;
  city: string;
  timezone: string | null;
}
