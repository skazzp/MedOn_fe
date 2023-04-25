import * as yup from 'yup';
import { isValidPhoneNumber } from 'react-phone-number-input';

export const newPatientSchema = yup.object({
  firstName: yup
    .string()
    .label('First Name')
    .min(3)
    .max(20)
    .matches(/^[a-zA-Z]+$/, { message: 'Only letters are required' })
    .required(),

  lastName: yup
    .string()
    .label('Last Name')
    .min(3)
    .max(20)
    .matches(/^[a-zA-Z]+$/, { message: 'Only letters are required' })
    .required(),

  email: yup.string().label('Email').email().max(40).required(),

  gender: yup.mixed().label('Gender').oneOf(['male', 'female']).required(),

  dateOfBirth: yup.string().label('Date of birth').required(),

  country: yup.string().label('Country').max(4).required(),

  city: yup.string().label('City').max(40).required(),

  phoneNumber: yup
    .string()
    .label('Phone number')
    .test('phone-number', 'Invalid phone number', (value) =>
      value ? isValidPhoneNumber(value) : false
    ),

  overview: yup.string().label('Overview').max(400),
});
