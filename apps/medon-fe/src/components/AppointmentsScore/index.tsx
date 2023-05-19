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

import { roles, routes } from 'utils/constants';

import { IAppointmentsScoreProps } from './types';

export default function AppointmentsScore({
  quantity,
}: IAppointmentsScoreProps) {
  const user = useAppSelector(getUserSelector);
  const { t } = useTranslation();

  return (
    <Appointments>
      <CountList>
        <h2>{t('dashboard.latest')}</h2>
        <UserIcon />
        <p data-testid="patient-count">{quantity}</p>
      </CountList>
      {user.role === roles.remote ? (
        <>
          <Radio>
            <input type="radio" name="choice" id="list" checked={true} />
            <label htmlFor="list" data-checked={true} data-testid="list">
              {t('dashboard.list')}
            </label>
            <input type="radio" name="choice" id="month" data-testid="month" />
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
