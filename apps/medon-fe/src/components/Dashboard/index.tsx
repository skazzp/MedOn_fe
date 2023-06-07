import { Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { getUserSelector } from 'redux/features/userSlice/userSelectors';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import {
  AppointmentContainer,
  Container,
  SkeletonContainer,
} from 'components/Dashboard/styles';
import WithoutAppointments from 'components/WithoutAppointments';
import AppointmentsScore from 'components/AppointmentsScore';
import Button from 'components/Button';
import { AppointmentsCard } from 'components/AppointmentsCard';

import { useGetFutureAppointmentsQuery } from 'redux/api/appointmentsApi';

import { defaultLimit, defaultMore, defaultOffset } from 'utils/constants';

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
      {getFutureAppointments?.data?.length ? (
        <>
          <AppointmentsScore quantity={getFutureAppointments.data.length} />
          <AppointmentContainer>
            {getFutureAppointments.data.map((appointment, index) => (
              <AppointmentsCard
                key={appointment.id}
                meetingCount={index + 1}
                role={user.role?.toString()}
                isLinkAdded={appointment.link === ''}
                {...appointment}
              />
            ))}
            {getFutureAppointments.data.length === limit && (
              <Button
                bgcolor={theme.colors.white}
                textcolor={theme.colors.blue_400}
                onClick={() => setLimit((prev) => prev + defaultMore)}
              >
                {t('appointments.more')}
              </Button>
            )}
          </AppointmentContainer>
        </>
      ) : (
        <WithoutAppointments />
      )}
    </Container>
  );
}
