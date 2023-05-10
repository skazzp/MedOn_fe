import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Navigation from 'components/Navigation';
import { useGetUserQuery } from 'redux/api/userApi';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getTokenSelector } from 'redux/features/userSlice/userSelectors';
import { localDoctorRoutes, routes } from 'utils/constants/routes';
import { roles } from 'utils/constants/roles';
import Container from './styles';

interface IProps {
  component: React.ReactElement;
}

export const PrivateRoute = ({ component }: IProps) => {
  const isLoggedIn = useAppSelector(getTokenSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: response } = useGetUserQuery(null, { skip: !isLoggedIn });

  useEffect(() => {
    if (response) {
      if (!response.data.isVerified) {
        navigate(routes.resendConfirmation);
      }
      if (!response.data.role && pathname !== routes.profile) {
        navigate(routes.profile);
      }
      if (
        response.data.role === roles.remote &&
        localDoctorRoutes.includes(pathname)
      ) {
        navigate(routes.dashboard);
      }
    }
  }, [response, dispatch, navigate, pathname]);

  return isLoggedIn ? (
    <Container>
      <Navigation />
      {component}
    </Container>
  ) : (
    <Navigate to={routes.login} />
  );
};
