import * as yup from 'yup';

export const emailSchema = yup.object().shape({
  email: yup.string().email('Must be a valid email').required().min(8),
});

export const passwordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(6, 'Must be at least 6 characters')
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'Password must include at least one capital letter, one small letter, one special character and one number'
    ),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});
