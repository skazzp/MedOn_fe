import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { INotification } from 'components/Notification/types';
import {
  roles,
  routes,
  formatTimeDifference,
  timerTimeout,
} from 'utils/constants';
import { Call, Info, InfoText, Wrapper } from 'components/Notification/styles';

export function Notification({
  user,
  appointment,
  timerType,
  renderTitle,
  type,
}: INotification) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [timer, setTimer] = useState<string>(formatTimeDifference(''));

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

  return (
    <Call type={type}>
      <Wrapper>
        <Info />
        <InfoText>
          <p>{renderTitle(timer)}</p>
          <p>
            <span>{`${appointment.patient?.firstName} ${appointment.patient?.lastName}`}</span>
            <span> and </span>
            <span>Dr. {doctor}</span>
          </p>
        </InfoText>
      </Wrapper>
      <button
        onClick={() =>
          navigate(`${routes.patientCard}/${appointment.patientId}`)
        }
      >
        {t('attention.detail')}
      </button>
    </Call>
  );
}
