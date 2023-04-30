import { useTranslation } from 'react-i18next';
import { getUserSelector } from 'redux/features/userSlice/userSelectors';
import { useAppSelector } from 'redux/hooks';

import { Container } from 'components/Dashboard/styles';
import WithoutAppointments from 'components/WithoutAppointments';
import Attention from 'components/common/Attention';
import AppointmentsScore from 'components/AppointmentsScore';
import AppointmentsList from 'components/Appointments';
import { patientList } from 'utils/mock/patientList';

export default function Dashboard() {
  const user = useAppSelector(getUserSelector);
  const { t } = useTranslation();
  const hasAppointments = patientList && patientList.length > 0;

  return (
    <Container>
      <h1>
        {t('dashboard.welcome')}, Dr. {`${user.lastName || 'Anonymous'}`}
      </h1>
      {hasAppointments ? (
        <>
          <Attention />
          <AppointmentsScore />
          <AppointmentsList />
        </>
      ) : (
        <WithoutAppointments />
      )}
    </Container>
  );
}
