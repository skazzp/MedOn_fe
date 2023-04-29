import { useTranslation } from 'react-i18next';

import { getUserSelector } from 'redux/features/userSlice/userSelectors';
import { useAppSelector } from 'redux/hooks';

import {
  Appointments,
  Availability,
  CountList,
  IconCalendar,
  Radio,
  UserIcon,
} from 'components/AppointmentsScore/styles';
import { patientList } from 'utils/mock/patientList';

export default function AppointmentsScore() {
  const user = useAppSelector(getUserSelector);
  const { t } = useTranslation();

  const sortedPatientList = patientList
    .filter((patient) => patient.doctor === user.lastName)
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <Appointments>
      <CountList>
        <h2>{t('dashboard.latest')}</h2>
        <UserIcon />
        <p>
          {user.role === 'remote'
            ? sortedPatientList.length
            : patientList.length}
        </p>
      </CountList>
      {user.role === 'remote' ? (
        <>
          <Radio>
            <input type="radio" name="choice" id="list" checked={true} />
            <label htmlFor="list" data-checked={true}>
              List
            </label>
            <input type="radio" name="choice" id="month" />
            <label htmlFor="month">Month</label>
          </Radio>

          <Availability to={'#'}>
            Manage availability
            <IconCalendar />
          </Availability>
        </>
      ) : (
        ''
      )}
    </Appointments>
  );
}
