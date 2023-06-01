import { Skeleton } from 'antd';
import { useState } from 'react';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { getUserSelector } from 'redux/features/userSlice/userSelectors';
import { useAppSelector } from 'redux/hooks';

import {
  AppointmentContainer,
  Container,
  NotFound,
  SkeletonContainer,
} from 'components/Dashboard/styles';
import Attention from 'components/common/Attention';
import AppointmentsScore from 'components/AppointmentsScore';
import Button from 'components/Button';
import { AppointmentsCard } from 'components/AppointmentsCard';

import { useGetFutureAppointmentsQuery } from 'redux/api/appointmentsApi';

import { defaultLimit, defaultMore, defaultOffset } from 'utils/constants';

// TODO:  add filter to localDoctor and notification => Attention

export default function Dashboard() {
  const [limit, setLimit] = useState<number>(defaultLimit);

  const user = useAppSelector(getUserSelector);
  const { t } = useTranslation();
  const { data: getFutureAppointments, isLoading } =
    useGetFutureAppointmentsQuery({
      limit,
      offset: defaultOffset,
    });
  const theme = useTheme();

  if (isLoading) {
    return (
      <SkeletonContainer>
        <Skeleton active avatar round />
        <Skeleton active title />
        <Skeleton active paragraph />
        <Skeleton active paragraph />
        <Skeleton active paragraph />
      </SkeletonContainer>
    );
  }

  return (
    <Container>
      <h1>
        {t('dashboard.welcome')}, {t('dashboard.prefix-doctor')}
        {`${user.lastName || 'Anonymous'}`}
      </h1>
      <Attention />
      <AppointmentsScore
        quantity={Number(getFutureAppointments?.data?.length)}
      />
      {getFutureAppointments?.data?.length ? (
        <AppointmentContainer>
          {getFutureAppointments?.data?.map((appointment) => (
            <AppointmentsCard
              key={appointment.id}
              role={user.role?.toString()}
              isLinkAdded={appointment.link === ''}
              {...appointment}
            />
          ))}
          {getFutureAppointments?.data?.length === limit && (
            <Button
              bgcolor={theme.colors.white}
              textcolor={theme.colors.blue_400}
              onClick={() => setLimit((prev) => prev + defaultMore)}
            >
              {t('appointments.more')}
            </Button>
          )}
        </AppointmentContainer>
      ) : (
        <NotFound>{t('dashboard.no-appointments')}</NotFound>
      )}
    </Container>
  );
}
