import Login from 'pages/Login';
import ForgetPassword from 'pages/ForgetPassword';
import ResetPassword from 'pages/ResetPassword';
import { Navigate, Route, Routes } from 'react-router-dom';
import ResendConfirmation from 'pages/ResendConfirmation';

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Login />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/re-confirm-account" element={<ResendConfirmation />} />
      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  );
}

export default App;
