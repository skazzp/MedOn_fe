export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  forgetPassword: '/forget-password',
  dashboard: '/dashboard',
  appointments: '/appointments',
  profile: '/profile',
  resetPassword: '/reset-password/:token',
  patientList: '/patient-list',
  help: '/help',
  exit: '/logout',
  availability: '/availability',
  resendConfirmation: '/re-confirm-account',
  updatePassword: '/update-password',
  patients: '/patients',
  addPatient: '/patients/add-new',
  withoutAppointments: '/dashboard/withoutAppointments',
};

export const localDoctorRoutes = [routes.addPatient];
