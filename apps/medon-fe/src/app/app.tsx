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
import PatientsList from 'components/PatientsList';
import { NewPatientForm } from 'components/NewPatientForm';
import Navigation from 'components/Navigation';
import { routes } from 'utils/constants/routes';
// import { ProfileRoute } from 'components/Routes/ProfileRoute';
import { persistedStore } from 'redux/store';

function App() {
  const isLoggedIn = useAppSelector(getTokenSelector);
  const { data, error } = useGetUserQuery(null, { skip: !isLoggedIn });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data.data));
    }
    if (error) {
      persistedStore.purge();
      dispatch(logout());
    }
  }, [data, error, dispatch]);

  return (
    <Routes>
      <Route
        path={routes.home}
        element={<PublicRoute component={<Login />} />}
      />
      <Route
        path={routes.login}
        element={<PublicRoute component={<Login />} />}
      />
      <Route
        path={routes.register}
        element={<PublicRoute component={<RegistrationPage />} />}
      />
      <Route
        path={routes.forgetPassword}
        element={<PublicRoute component={<ForgetPassword />} />}
      />
      <Route
        path={routes.resetPassword}
        element={<PublicRoute component={<ResetPassword />} />}
      />

      <Route
        path={routes.dashboard}
        element={<PrivateRoute component={<Navigation />} />}
      />
      <Route
        path={routes.profile}
        element={<PrivateRoute component={<ProfilePage />} />}
      />
      <Route
        path={routes.resendConfirmation}
        element={<ResendConfirmation />}
      />
      <Route
        path={routes.updatePassword}
        element={<PrivateRoute component={<UpdatePassword />} />}
        // element={<UpdatePassword />}
      />
      <Route
        path={routes.patients}
        element={<PrivateRoute component={<PatientsPage />} />}
      >
        <Route index element={<PatientsList />} />
        <Route path={routes.addPatient} element={<NewPatientForm />} />
      </Route>
      <Route path="*" element={<Navigate to={routes.login} />} />
    </Routes>
  );
}

export default App;
