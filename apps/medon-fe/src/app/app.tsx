import { Navigate, Route, Routes } from 'react-router-dom';

import RegistrationPage from 'pages/RegistrationPage';
import Login from 'pages/Login';
import ForgetPassword from 'pages/ForgetPassword';
import ResetPassword from 'pages/ResetPassword';
import ResendConfirmation from 'pages/ResendConfirmation';
import UpdatePassword from 'pages/UpdatePassword';
import ProfilePage from 'pages/ProfilePage';

import { navigation } from 'utils/constants/navigation';

function App() {
  return (
    <Routes>
      <Route path={navigation.login} element={<Login />} />
      <Route path={navigation.register} element={<RegistrationPage />} />
      <Route path={navigation.forgetPassword} element={<ForgetPassword />} />
      <Route path={navigation.profile} element={<ProfilePage />} />
      <Route path={navigation.resetPassword} element={<ResetPassword />} />
      <Route
        path={navigation.resendConfirmation}
        element={<ResendConfirmation />}
      />
      <Route path={navigation.updatePassword} element={<UpdatePassword />} />
      <Route path="*" element={<Navigate to={navigation.login} />} />
    </Routes>
  );
}

export default App;
