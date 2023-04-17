import RegistrationPage from 'pages/RegistrationPage';
import Login from 'pages/Login';
import ForgetPassword from 'pages/ForgetPassword';
import ResetPassword from 'pages/ResetPassword';
// import ProfilePage from 'pages/ProfilePage';
// import Navigation from 'components/Navigation';
import { Navigate, Route, Routes } from 'react-router-dom';
import ResendConfirmation from 'pages/ResendConfirmation';
import Layout from 'pages/Layout';
import { PublicRoute } from 'components/Routes/PublicRoute';
import { PrivateRoute } from 'components/Routes/PrivateRoute';
// import Profile from 'components/Profile';

function App() {
  return (
    <Routes>
      <Route index path="/" element={<PublicRoute component={<Login />} />} />
      <Route path="/login" element={<PublicRoute component={<Login />} />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/profile"
        element={<PrivateRoute component={<Layout />} />}
      />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/re-confirm-account" element={<ResendConfirmation />} />
      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  );
}

export default App;
