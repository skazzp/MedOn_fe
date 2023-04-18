import * as yup from 'yup';

export const passwordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .min(6, 'validation.password.minLength')
    .max(20, 'validation.password.maxLength')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+-])[0-9a-zA-Z!@#$%^&()_+-]{6,}$/,
      'validation.password.matches'
    ),
  newPassword: yup
    .string()
    .min(6, 'validation.password.minLength')
    .max(20, 'validation.password.maxLength')
    .notOneOf([yup.ref('currentPassword')], 'validation.password.notEqual')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+-])[0-9a-zA-Z!@#$%^&()_+-]{6,}$/,
      'validation.password.matches'
    )
    .required('validation.password.required'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'validation.passwordRepeat.matches')
    .required('validation.passwordRepeat.required'),
});
