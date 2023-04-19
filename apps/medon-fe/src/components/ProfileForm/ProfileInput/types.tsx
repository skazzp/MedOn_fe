import { Control } from 'react-hook-form';
import { FormProfileData } from 'components/ProfileForm/types';

export enum InputFields {
  firstName = 'firstName',
  lastName = 'lastName',
  email = 'email',
  city = 'city',
}

export interface IProps {
  control: Control<FormProfileData>;
  name: InputFields;
  error: string | undefined;
  disabled: boolean;
}
