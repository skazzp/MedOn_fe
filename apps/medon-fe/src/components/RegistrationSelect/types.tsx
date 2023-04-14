import { Control, FieldPath } from 'react-hook-form';
import { FormData } from 'components/RegistrationForm/types';

export interface Option {
  value: string | number;
  label: string;
}
export interface IProps {
  control: Control<FormData>;
  name: FieldPath<FormData>;
  options: Option[];
  error: string | undefined;
}
