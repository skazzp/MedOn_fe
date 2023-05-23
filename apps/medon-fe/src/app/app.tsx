import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { Skeleton } from 'antd';

import RegistrationPage from 'pages/RegistrationPage';
import Login from 'pages/Login';
import ForgetPassword from 'pages/ForgetPassword';
import ResetPassword from 'pages/ResetPassword';
import ResendConfirmation from 'pages/ResendConfirmation';
import UpdatePassword from 'pages/UpdatePassword';
import ProfilePage from 'pages/ProfilePage';
import { PatientsPage } from 'pages/PatientsPage';
import BookAppointment from 'pages/BookAppointment';
import { DashboardPage } from 'pages/Dashboard';
import AvailabilityPage from 'pages/AvailabilityPage';
import AppointmentsPage from 'pages/AppointmentsPage';

import PatientCard from 'components/PatientCard';
import { PublicRoute } from 'components/Routes/PublicRoute';
import { PrivateRoute } from 'components/Routes/PrivateRoute';
import PatientsList from 'components/PatientsList';
import { NewPatientForm } from 'components/NewPatientForm';
import { PatientCardCalendar } from 'components/PatientCardCalendar';
import { SkeletonContainer } from 'components/PatientCard/styles';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getTokenSelector } from 'redux/features/userSlice/userSelectors';
import { useGetUserQuery } from 'redux/api/userApi';
import { logout, setUser } from 'redux/features/userSlice/userSlice';
import { persistedStore } from 'redux/store';

import { routes } from 'utils/constants/routes';

function App() {
  const isLoggedIn = useAppSelector(getTokenSelector);
  const { data, error, isLoading } = useGetUserQuery(null, {
    skip: !isLoggedIn,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn && data) {
      dispatch(setUser(data.data));
    }
    if (error) {
      persistedStore.purge();
      dispatch(logout());
    }
  }, [data, error, dispatch, isLoggedIn]);

  if (isLoading)
    return (
      <SkeletonContainer>
        <Skeleton active avatar round />
        <Skeleton active title />
        <Skeleton active paragraph />
        <Skeleton active paragraph />
        <Skeleton active paragraph />
      </SkeletonContainer>
    );

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
        element={<PrivateRoute component={<DashboardPage />} />}
      />
      <Route
        path={routes.profile}
        element={<PrivateRoute component={<ProfilePage />} />}
      />
      <Route
        path={routes.availability}
        element={<PrivateRoute component={<AvailabilityPage />} />}
      />
      <Route
        path={routes.resendConfirmation}
        element={<ResendConfirmation />}
      />
      {/* <Route
        path={routes.appointments}
        element={<PrivateRoute component={<AppointmentsPage />} />}
      /> */}
      <Route
        path={routes.updatePassword}
        element={<PrivateRoute component={<UpdatePassword />} />}
      />
      <Route
        path={routes.patients}
        element={<PrivateRoute component={<PatientsPage />} />}
      >
        <Route index element={<PatientsList />} />
        <Route path={routes.addPatient} element={<NewPatientForm />} />
        <Route path={`${routes.patientCard}/:id`} element={<PatientCard />}>
          <Route index element={<PatientCardCalendar />} />
          <Route
            path={routes.patientCardAppointment}
            element={<BookAppointment />}
          />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to={routes.login} />} />
    </Routes>
  );
}

export default App;
