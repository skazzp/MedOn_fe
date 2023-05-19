import { useTranslation } from 'react-i18next';
import { getUserSelector } from 'redux/features/userSlice/userSelectors';
import { useAppSelector } from 'redux/hooks';

import { AppointmentContainer, Container } from 'components/Dashboard/styles';
import WithoutAppointments from 'components/WithoutAppointments';
import Attention from 'components/common/Attention';
import AppointmentsScore from 'components/AppointmentsScore';
import { AppointmentsCard } from 'components/AppointmentsCard';

import { appointmentCardMock } from 'utils/mock/appointment';

export default function Dashboard() {
  const user = useAppSelector(getUserSelector);
  const { t } = useTranslation();

  return (
    <Container>
      <h1>
        {t('dashboard.welcome')}, {t('dashboard.prefix-doctor')}
        {`${user.lastName || 'Anonymous'}`}
      </h1>
      {appointmentCardMock.length ? (
        <>
          <Attention />
          <AppointmentsScore quantity={appointmentCardMock.length} />
          <AppointmentContainer>
            {appointmentCardMock
              .sort(
                (a, b) =>
                  Number(a.startTime?.getHours()) -
                  Number(b.startTime?.getHours())
              )
              .map((appointment) => (
                <AppointmentsCard
                  key={appointment.id}
                  isLinkAdded={appointment.link === ''}
                  {...appointment}
                />
              ))}
          </AppointmentContainer>
        </>
      ) : (
        <WithoutAppointments />
      )}
    </Container>
  );
}
