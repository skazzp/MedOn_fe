import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { useGetUserQuery } from 'redux/api/userApi';
import { getTokenSelector } from 'redux/features/userSlice/userSelectors';
import { useGetActiveAppointmentsQuery } from 'redux/api/appointmentsApi';

import Navigation from 'components/Navigation';
import Attention from 'components/common/Attention';

import { localDoctorRoutes, routes } from 'utils/constants/routes';
import { roles } from 'utils/constants/roles';

import { Container, Wrapper } from './styles';
import { useNotification } from './hooks/useNotification';

interface IProps {
  component: React.ReactElement;
}

export const PrivateRoute = ({ component }: IProps) => {
  const isLoggedIn = useAppSelector(getTokenSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { data: response } = useGetUserQuery(null, { skip: !isLoggedIn });
  const { data: activeAppointments, refetch } = useGetActiveAppointmentsQuery({
    userId: response?.data.id,
  });
  useNotification(response?.data.id, refetch);

  useEffect(() => {
    console.log(activeAppointments);
  }, [activeAppointments]);

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
      <Wrapper>
        {activeAppointments?.data?.[0] && response?.data && (
          <Attention
            appointment={activeAppointments.data[0]}
            user={response.data}
          />
        )}
        {component}
      </Wrapper>
    </Container>
  ) : (
    <Navigate to={routes.login} />
  );
};
