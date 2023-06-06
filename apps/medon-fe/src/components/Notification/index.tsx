import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { INotification, NotificationType } from 'components/Notification/types';
import {
  formatTimeDifference,
  roles,
  routes,
  timerTimeout,
} from 'utils/constants';
import { ReactComponent as InfoIcon } from 'assets/images/dashboard/Info.svg';
import { Content, Wrapper } from 'components/Notification/styles';

export function Notification({
  user,
  appointment,
  timerType,
  renderTitle,
  type,
}: INotification) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [timer, setTimer] = useState<string>(
    formatTimeDifference(appointment.startTime, timerType)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(formatTimeDifference(appointment?.startTime, timerType));
    }, timerTimeout);
    return () => {
      clearInterval(interval);
    };
  }, [user, appointment]);

  const doctor = useMemo(
    () =>
      user.role === roles.local
        ? appointment?.remoteDoctor?.lastName
        : appointment?.localDoctor?.lastName,
    [user, appointment]
  );

  const renderingCondition =
    (type === NotificationType.Current &&
      new Date().getTime() < new Date(appointment.endTime).getTime()) ||
    (type === NotificationType.Upcoming &&
      new Date().getTime() < new Date(appointment.startTime).getTime());

  return renderingCondition ? (
    <Wrapper type={type}>
      <Content>
        <InfoIcon />
        <div>
          <p>{renderTitle(timer)}</p>
          <p>
            {t('notification.patient')}{' '}
            <span>
              {appointment.patient?.firstName} {appointment.patient?.lastName}
            </span>{' '}
            {t('notification.and')}{' '}
            <span>
              {t('notification.doctor-prefix')} {doctor}
            </span>
          </p>
        </div>
      </Content>
      <button
        onClick={() =>
          navigate(`${routes.patientCard}/${appointment.patientId}`)
        }
      >
        {t('notification.details')}
      </button>
    </Wrapper>
  ) : null;
}
