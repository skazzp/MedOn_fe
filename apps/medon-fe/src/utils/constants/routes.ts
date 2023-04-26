export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  forgetPassword: '/forget-password',
  dashboard: '/dashboard',
  appointments: '/appointments',
  profile: '/profile',
  resetPassword: '/reset-password/:token',
  help: '/help',
  exit: '/logout',
  resendConfirmation: '/re-confirm-account',
  updatePassword: '/update-password',
  patientList: '/patients',
  patientCard: '/patients/card',
  addPatient: '/patients/add-new',
};

export const localDoctorRoutes = [routes.addPatient];
