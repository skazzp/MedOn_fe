import { Navigate, Route, Routes } from 'react-router-dom';

import RegistrationPage from 'pages/RegistrationPage';
import Login from 'pages/Login';
import ForgetPassword from 'pages/ForgetPassword';
import ResetPassword from 'pages/ResetPassword';
import ResendConfirmation from 'pages/ResendConfirmation';
import UpdatePassword from 'pages/UpdatePassword';
import { PatientsPage } from 'pages/PatientsPage';

import Navigation from 'components/Navigation/index';
import PatientsList from 'components/PatientsList';
import { NewPatientForm } from 'components/NewPatientForm';

import { navigation } from 'utils/constants/navigation';

function App() {
  return (
    <Routes>
      <Route path={navigation.login} element={<Login />} />
      <Route path={navigation.register} element={<RegistrationPage />} />
      <Route path={navigation.forgetPassword} element={<ForgetPassword />} />
      <Route path={navigation.dashboard} element={<Navigation />} />
      <Route path={navigation.resetPassword} element={<ResetPassword />} />
      <Route
        path={navigation.resendConfirmation}
        element={<ResendConfirmation />}
      />
      <Route path={navigation.updatePassword} element={<UpdatePassword />} />
      <Route path={navigation.patientList} element={<PatientsPage />}>
        <Route index element={<PatientsList />} />
        <Route
          path={navigation.patientListAddNew}
          element={<NewPatientForm />}
        />
      </Route>
      <Route path="*" element={<Navigate to={navigation.login} />} />
    </Routes>
  );
}

export default App;
