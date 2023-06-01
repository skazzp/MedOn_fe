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
    userId: Number(response?.data.id),
  });

  useEffect(() => {
    console.log(activeAppointments);
  }, [activeAppointments]);

  useEffect(() => {
    const client = io(`${process.env.NX_API_URL}/notification`);

    if (response && response.data) {
      client.emit('subscribeToAppointments', response.data.id);
      client.on('appointmentsHaveChanged', () => refetch());
    }

    return () => {
      client.close();
    };
  }, [response]);

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
        <Attention />
        {component}
      </Wrapper>
    </Container>
  ) : (
    <Navigate to={routes.login} />
  );
};
