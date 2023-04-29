import { IPatient } from 'interfaces/patients';

export function formatPatientCard(patient: IPatient) {
  const { firstName, lastName, gender } = patient;
  const formattedName = `${firstName} ${lastName}`;
  const formattedGender = gender.charAt(0).toUpperCase() + gender.slice(1);
  const birthdate = new Date(patient.dateOfBirth);
  const ageDiffMs = Date.now() - birthdate.getTime();
  const ageDate = new Date(ageDiffMs);
  const formattedAge = Math.abs(ageDate.getUTCFullYear() - 1970);

  return { formattedName, formattedGender, formattedAge };
}
