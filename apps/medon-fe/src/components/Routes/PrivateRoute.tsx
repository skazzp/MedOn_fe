import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { useGetUserQuery } from 'redux/api/userApi';
import { getTokenSelector } from 'redux/features/userSlice/userSelectors';
import { getNotification } from 'redux/features/notificationSlice/notificationSlice';

import Navigation from 'components/Navigation';
import { Notification } from 'components/Notification';
import { NotificationType, TimerType } from 'components/Notification/types';

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

  useNotification(response?.data.id);
  const notifications = useAppSelector(getNotification);

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
        {response?.data && notifications.upcomingAppointment && (
          <Notification
            user={response.data}
            appointment={notifications.upcomingAppointment}
            timerType={TimerType.CountDown}
            renderTitle={(timer: string) =>
              `You will have an appointment in ${timer} minutes with:`
            }
            type={NotificationType.Upcoming}
          />
        )}
        {response?.data && notifications.currentAppointment && (
          <Notification
            user={response.data}
            appointment={notifications.currentAppointment}
            timerType={TimerType.Counter}
            renderTitle={(timer: string) =>
              `Your appointment has already started and lasts ${timer} minutes with:`
            }
            type={NotificationType.Current}
          />
        )}
        {component}
      </Wrapper>
    </Container>
  ) : (
    <Navigate to={routes.login} />
  );
};
