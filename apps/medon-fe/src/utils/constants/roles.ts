export const roles = {
  local: 'local',
  remote: 'remote',
};

export const rolesOptions = [
  { value: roles.local, label: 'Local doctor' },
  { value: roles.remote, label: 'Remote doctor' },
];

// TODO: should be removed to options from backend
export const specialityOptions = [
  { value: 1, label: 'Surgeon' },
  { value: 2, label: 'Neurologist' },
  { value: 3, label: 'Plastic surgeon' },
  { value: 4, label: 'Ophthalmologist' },
  { value: 5, label: 'Dermatologist' },
];
