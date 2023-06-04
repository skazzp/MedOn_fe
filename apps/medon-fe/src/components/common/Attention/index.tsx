import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'redux/hooks';
import { getCurrentAppointment } from 'redux/features/currentAppointmentSlice/currentAppointmentSlice';
import { IUser } from 'redux/api/types';
import {
  roles,
  routes,
  formatTimeDifference,
  countDownTimeout,
} from 'utils/constants';
import {
  Call,
  Info,
  InfoText,
  Wrapper,
  Name,
  InfoButton,
} from 'components/common/Attention/styles';

export function Attention({ user }: { user: IUser }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const currentAppointment = useAppSelector(getCurrentAppointment);

  const [time, setTime] = useState<string>(formatTimeDifference(''));
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    if (currentAppointment) {
      const interval = setInterval(() => {
        setTime(formatTimeDifference(currentAppointment?.startTime));
      }, countDownTimeout);
      return () => {
        clearInterval(interval);
      };
    }
  }, [currentAppointment]);

  useEffect(() => {
    if (currentAppointment) {
      setTitle(
        new Date(currentAppointment?.startTime) < new Date()
          ? 'Appointment has already started with:'
          : `You will have an appointment in ${time} minutes with:`
      );
    }
  }, [time, currentAppointment]);

  const anotherDoctorLastName = useMemo(
    () =>
      user.role === roles.local
        ? currentAppointment?.remoteDoctor?.lastName
        : currentAppointment?.localDoctor?.lastName,
    [user, currentAppointment]
  );

  return (
    <>
      {currentAppointment && (
        <Call>
          <Wrapper>
            <Info />
            <InfoText>
              <p>{title}</p>
              <p>
                <Name>{`${currentAppointment.patient?.firstName} ${currentAppointment.patient?.lastName}`}</Name>
                <span> and </span>
                <Name> Dr. {anotherDoctorLastName}</Name>
              </p>
            </InfoText>
          </Wrapper>
          <InfoButton
            onClick={() =>
              navigate(`${routes.patientCard}/${currentAppointment.patientId}`)
            }
          >
            {t('attention.detail')}
          </InfoButton>
        </Call>
      )}
    </>
  );
}

export default Attention;
