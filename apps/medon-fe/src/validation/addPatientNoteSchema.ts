import * as yup from 'yup';

export const addPatientNoteSchema = yup.object().shape({
  note: yup
    .string()
    .required('validation.note.required')
    .min(10, 'validation.note.minLength')
    .max(200, 'validation.note.maxLength'),
});
