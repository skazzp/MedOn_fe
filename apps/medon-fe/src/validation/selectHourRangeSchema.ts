import * as yup from 'yup';

export const hoursSchema = yup.object().shape({
  start: yup.number().required(),
  end: yup.number().moreThan(yup.ref('start'), 'Wrong time').required(),
});
