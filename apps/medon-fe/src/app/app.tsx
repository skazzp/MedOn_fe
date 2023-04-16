import RegistrationPage from 'pages/RegistrationPage';
import Login from 'pages/Login';
import ForgetPassword from 'pages/ForgetPassword';
import ResetPassword from 'pages/ResetPassword';
import ProfilePage from 'pages/ProfilePage';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navigation from 'components/Navigation';
import ResendConfirmation from 'pages/ResendConfirmation';

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/dashboard" element={<Navigation />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/re-confirm-account" element={<ResendConfirmation />} />
      <Route path="*" element={<Navigate to={'/'} />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
