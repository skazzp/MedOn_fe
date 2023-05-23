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
  availability: '/availability',
  resendConfirmation: '/re-confirm-account',
  updatePassword: '/update-password',
  patients: '/patients',
  patientCard: '/patients/card',
  patientCardAppointment: 'appointment',
  addPatient: '/patients/add-new',
  withoutAppointments: '/dashboard/withoutAppointments',
  appointment: '/appointment',
};

export const localDoctorRoutes = [routes.addPatient];
