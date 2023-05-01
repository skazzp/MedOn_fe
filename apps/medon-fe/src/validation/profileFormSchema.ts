import { roles } from 'utils/constants/roles';
import { bDayValidation } from 'utils/functions/bDayValidation';
import * as yup from 'yup';

export const profileFormSchema = yup.object({
  firstName: yup
    .string()
    .min(3, 'validation.minLength')
    .max(20, 'validation.maxLength')
    .matches(/^[a-zA-Z]+$/, 'validation.firstName.matches')
    .required('validation.firstName.required'),
  lastName: yup
    .string()
    .min(3, 'validation.minLength')
    .max(20, 'validation.maxLength')
    .matches(/^[a-zA-Z]+$/, 'validation.lastName.matches')
    .required('validation.lastName.required'),
  email: yup
    .string()
    .email('validation.email.matches')
    .required('validation.email.required'),
  role: yup.string().required('validation.role.required'),
  speciality: yup.string().when('role', {
    is: roles.remote,
    then: (schema) => schema.required('validation.speciality.required'),
    otherwise: (schema) => schema.nullable(),
  }),
  birthday: yup
    .date()
    .nullable()
    .max(bDayValidation(), 'validation.birthday.max')
    .default(null)
    .transform((curr, orig) => (orig === '' ? null : curr))
    .typeError('validation.birthday.required')
    .required('validation.birthday.required'),
  country: yup.string().required('validation.country.required'),
  city: yup.string().required('validation.city.required'),
  timezone: yup.string().required('validation.timezone.required'),
});
