import * as yup from 'yup';

export const registrationFormSchema = yup.object({
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
  birthday: yup
    .date()
    .nullable()
    .default(null)
    .transform((curr, orig) => (orig === '' ? null : curr))
    .typeError('validation.birthday.required')
    .required('validation.birthday.required'),
  country: yup.string().required('validation.country.required'),
  city: yup.string().required('validation.city.required'),
  timezone: yup.string().required('validation.timezone.required'),
});
