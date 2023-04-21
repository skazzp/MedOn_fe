import { Navigate, Route, Routes } from 'react-router-dom';

import RegistrationPage from 'pages/RegistrationPage';
import Login from 'pages/Login';
import ForgetPassword from 'pages/ForgetPassword';
import ResetPassword from 'pages/ResetPassword';
import ResendConfirmation from 'pages/ResendConfirmation';
import UpdatePassword from 'pages/UpdatePassword';
import ProfilePage from 'pages/ProfilePage';
import { PublicRoute } from 'components/Routes/PublicRoute';
import { PrivateRoute } from 'components/Routes/PrivateRoute';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getTokenSelector } from 'redux/features/userSlice/userSelectors';
import { useEffect } from 'react';
import { useGetUserQuery } from 'redux/api/userApi';
import { logout, setUser } from 'redux/features/userSlice/userSlice';

import { PatientsPage } from 'pages/PatientsPage';
import Navigation from 'components/Navigation';
import { PatientsList } from 'components/PatientsList';
import { NewPatientForm } from 'components/NewPatientForm';
import { routes } from 'utils/constants/routes';

function App() {
  const isLoggedIn = useAppSelector(getTokenSelector);
  const { data, error } = useGetUserQuery(null, { skip: !isLoggedIn });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data.data));
    }
    if (error) {
      dispatch(logout());
    }
  }, [data, error, dispatch]);

  return (
    <Routes>
      <Route path={routes.login} element={<Login />} />
      <Route path={routes.register} element={<RegistrationPage />} />
      <Route path={routes.forgetPassword} element={<ForgetPassword />} />
      <Route path={routes.dashboard} element={<Navigation />} />
      <Route path={routes.profile} element={<ProfilePage />} />
      <Route path={routes.resetPassword} element={<ResetPassword />} />
      <Route
        path={routes.resendConfirmation}
        element={<ResendConfirmation />}
      />
      <Route path={routes.updatePassword} element={<UpdatePassword />} />
      <Route path={routes.patients} element={<PatientsPage />}>
        <Route index element={<PatientsList />} />
        <Route path={routes.addPatient} element={<NewPatientForm />} />
      </Route>
      <Route path="*" element={<Navigate to={routes.login} />} />
    </Routes>
  );
}

export default App;
