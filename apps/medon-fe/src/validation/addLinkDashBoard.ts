import * as yup from 'yup';

export const addLinkSchema = yup.object().shape({
  link: yup
    .string()
    .required('validation.link.required')
    .matches(/^https?:\/\/(?:www\.)?[\w-]+(?:\.[\w-]+)+[\w.,@?^=%&:/~+#-]*$/, {
      message: 'validation.link.url',
    })
    .min(8, 'validation.link.min'),
});
