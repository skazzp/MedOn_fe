import { Control } from 'react-hook-form';
import { FormProfileData } from 'components/ProfileForm/types';

export interface Option {
  value: string | number;
  label: string;
}
export interface IProps {
  control: Control<FormProfileData>;
  error: string | undefined;
  disabled: boolean;
}
