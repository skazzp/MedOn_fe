import { Control, FieldPath } from 'react-hook-form';
import { FormProfileData, UserData } from 'components/ProfileForm/types';

export interface Option {
  value: string | number;
  label: string;
}
export interface IProps {
  control: Control<FormProfileData>;
  name: FieldPath<FormProfileData>;
  options: Option[];
  error: string | undefined;
  userData: UserData | null;
}