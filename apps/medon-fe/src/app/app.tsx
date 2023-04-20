import { Navigate, Route, Routes } from 'react-router-dom';
import RegistrationPage from 'pages/RegistrationPage';
import Login from 'pages/Login';
import ForgetPassword from 'pages/ForgetPassword';
import ResetPassword from 'pages/ResetPassword';
import ResendConfirmation from 'pages/ResendConfirmation';
import UpdatePassword from 'pages/UpdatePassword';
import Navigation from 'components/Navigation/index';
import { PatientsPage } from 'pages/PatientsPage';
import PatientsList from 'components/PatientsList';
import { NewPatientForm } from 'components/NewPatientForm';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/dashboard" element={<Navigation />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/re-confirm-account" element={<ResendConfirmation />} />
      <Route path="/update-password" element={<UpdatePassword />} />
      <Route path="/patients" element={<PatientsPage />}>
        <Route index element={<PatientsList />} />
        <Route path="add-new" element={<NewPatientForm />} />
      </Route>
      <Route path="*" element={<Navigate to={'/login'} />} />
    </Routes>
  );
}

export default App;
