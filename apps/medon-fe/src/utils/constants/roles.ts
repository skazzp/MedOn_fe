export const ROLES = {
  LOCAL: 'local',
  REMOTE: 'remote',
};

export const ROLE_OPTIONS = [
  { value: ROLES.LOCAL, label: 'Local doctor' },
  { value: ROLES.REMOTE, label: 'Remote doctor' },
];

// TODO: should be removed to options from backend
export const SPECIALITY_OPTIONS = [
  { value: 1, label: 'Surgeon' },
  { value: 2, label: 'Neurologist' },
  { value: 3, label: 'Plastic surgeon' },
  { value: 4, label: 'Ophthalmologist' },
  { value: 5, label: 'Dermatologist' },
];
