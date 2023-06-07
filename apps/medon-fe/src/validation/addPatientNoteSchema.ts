import * as yup from 'yup';
import { maxLengthTextArea } from 'utils/constants';

export const addPatientNoteSchema = yup.object().shape({
  note: yup
    .string()
    .required('validation.note.required')
    .min(10, 'validation.note.minLength')
    .max(maxLengthTextArea, 'validation.note.maxLength'),
});
