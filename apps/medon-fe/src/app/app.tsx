import { Navigate, Route, Routes } from 'react-router-dom';
import RegistrationPage from 'pages/RegistrationPage';
import Login from 'pages/Login';
import ForgetPassword from 'pages/ForgetPassword';
import ResetPassword from 'pages/ResetPassword';
import ResendConfirmation from 'pages/ResendConfirmation';
import UpdatePassword from 'pages/UpdatePassword';
import Navigation from 'components/Navigation/index';
import ProfilePage from 'pages/ProfilePage';
import { PublicRoute } from 'components/Routes/PublicRoute';
import { PrivateRoute } from 'components/Routes/PrivateRoute';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getTokenSelector } from 'redux/features/userSlice/userSelectors';
import { useEffect } from 'react';
import { useGetUserQuery } from 'redux/api/userApi';
import { logout, setUser } from 'redux/features/userSlice/userSlice';

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
      <Route index path="/" element={<PublicRoute component={<Login />} />} />
      <Route path="/login" element={<PublicRoute component={<Login />} />} />
      <Route
        path="/register"
        element={<PublicRoute component={<RegistrationPage />} />}
      />
      <Route
        path="/forget-password"
        element={<PublicRoute component={<ForgetPassword />} />}
      />
      <Route
        path="/reset-password/:token"
        element={<PublicRoute component={<ResetPassword />} />}
      />
      <Route path="/dashboard" element={<Navigation />} />
      <Route
        path="/profile"
        element={<PrivateRoute component={<ProfilePage />} />}
      />
      <Route
        path="/re-confirm-account"
        element={<PrivateRoute component={<ResendConfirmation />} />}
      />
      <Route
        path="/update-password"
        element={<PrivateRoute component={<UpdatePassword />} />}
      />
      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  );
}

export default App;
