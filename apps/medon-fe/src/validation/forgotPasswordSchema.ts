import * as yup from 'yup';

export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email('email.email')
    .required('email.required')
    .min(8, 'email.min'),
});

export const passwordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(6, 'newpassword.min')
    .required('newpassword.required')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|:;"'<,>.?/])[A-Za-z\d!@#$%^&*()_\-+={}[\]|:;"'<,>.?/]{6,}$/,
      'newpassword.matches'
    ),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'confirmpassword.oneof')
    .required('confirmpassword.required'),
});
