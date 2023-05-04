import { useMemo } from 'react';
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
import { roles, routes } from 'utils/constants';

export default function AppointmentsScore() {
  const user = useAppSelector(getUserSelector);
  const { t } = useTranslation();

  const sortedPatientList = useMemo(
    () =>
      patientList
        .filter((patient) =>
          user.role === roles.remote ? patient.doctor === user.lastName : true
        )
        .sort((a, b) => a.time.localeCompare(b.time)),
    [user]
  );

  return (
    <Appointments>
      <CountList>
        <h2>{t('dashboard.latest')}</h2>
        <UserIcon />
        <p>
          {user.role === roles.remote
            ? sortedPatientList.length
            : patientList.length}
        </p>
      </CountList>
      {user.role === roles.remote ? (
        <>
          <Radio>
            <input type="radio" name="choice" id="list" checked={true} />
            <label htmlFor="list" data-checked={true}>
              {t('dashboard.list')}
            </label>
            <input type="radio" name="choice" id="month" />
            <label htmlFor="month">{t('dashboard.month')}</label>
          </Radio>

          <Availability to={routes.availability}>
            {t('dashboard.manage')}
            <IconCalendar />
          </Availability>
        </>
      ) : (
        ''
      )}
    </Appointments>
  );
}
