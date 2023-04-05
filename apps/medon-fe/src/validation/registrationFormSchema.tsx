import * as yup from 'yup';

export const registrationFormSchema = yup.object({
  firstName: yup
    .string()
    .min(3, 'Length at least 3 characters')
    .matches(/^[a-zA-Z]+$/, 'First name must have only letters')
    .required('First name is required'),
  lastName: yup
    .string()
    .min(3, 'Length at least 3 characters')
    .matches(/^[a-zA-Z]+$/, 'Last name must contain only letters')
    .required('Last name is required'),
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+-])[0-9a-zA-Z!@#$%^&()_+-]{6,}$/,
      'At least one capital and small letter, special character and number'
    )
    .required('Password is required'),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  role: yup.string().required('Choose a role'),
  speciality: yup.string().when('role', {
    is: 'remote',
    then: (schema) => schema.required('Speciality is required'),
    otherwise: (schema) => schema.nullable(),
  }),
  birthday: yup
    .date()
    .nullable()
    .default(null)
    .transform((curr, orig) => (orig === '' ? null : curr))
    .typeError('Birthday is required')
    .required('Birthday is required'),
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  timezone: yup.string().required('Time zone is required'),
});
