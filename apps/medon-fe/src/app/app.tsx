import { Navigate, Route, Routes } from 'react-router-dom';

import RegistrationPage from 'pages/RegistrationPage';
import Login from 'pages/Login';
import ForgetPassword from 'pages/ForgetPassword';
import ResetPassword from 'pages/ResetPassword';
import ResendConfirmation from 'pages/ResendConfirmation';
import UpdatePassword from 'pages/UpdatePassword';
import { PatientsPage } from 'pages/PatientsPage';

import PatientsList from 'components/PatientsList';
import { NewPatientForm } from 'components/NewPatientForm';
import Navigation from 'components/Navigation';
import PatientCard from 'components/PatientCard';

import { routes } from 'utils/constants/routes';

function App() {
  return (
    <Routes>
      <Route path={routes.login} element={<Login />} />
      <Route path={routes.register} element={<RegistrationPage />} />
      <Route path={routes.forgetPassword} element={<ForgetPassword />} />
      <Route path={routes.dashboard} element={<Navigation />} />
      <Route path={routes.resetPassword} element={<ResetPassword />} />
      <Route
        path={routes.resendConfirmation}
        element={<ResendConfirmation />}
      />
      <Route path={routes.updatePassword} element={<UpdatePassword />} />
      <Route path={routes.patients} element={<PatientsPage />}>
        <Route index element={<PatientsList />} />
        <Route path={routes.addPatient} element={<NewPatientForm />} />
        <Route path={routes.patientCard} element={<PatientCard />} />
      </Route>
      <Route path="*" element={<Navigate to={routes.login} />} />
    </Routes>
  );
}

export default App;
