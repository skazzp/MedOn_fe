import RegistrationPage from 'pages/RegistrationPage';
import Login from 'pages/Login';
import ForgetPassword from 'pages/ForgetPassword';
import ResetPassword from 'pages/ResetPassword';
import { Navigate, Route, Routes } from 'react-router-dom';
import ResendConfirmation from 'pages/ResendConfirmation';
import Profile from 'components/Profile';

function App() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route index path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/re-confirm-account" element={<ResendConfirmation />} />
      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  );
}

export default App;
