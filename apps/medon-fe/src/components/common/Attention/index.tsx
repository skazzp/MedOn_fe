import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'redux/hooks';
import { getActiveAppointment } from 'redux/features/appointmentsSlice/activeAppointmentSlice';
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

  const activeAppointment = useAppSelector(getActiveAppointment);

  const [time, setTime] = useState<string>(formatTimeDifference(''));
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    if (activeAppointment) {
      const interval = setInterval(() => {
        setTime(formatTimeDifference(activeAppointment?.startTime));
      }, countDownTimeout);
      return () => {
        clearInterval(interval);
      };
    }
  }, [activeAppointment]);

  useEffect(() => {
    if (activeAppointment) {
      setTitle(
        new Date(activeAppointment?.startTime) < new Date()
          ? 'Appointment has already started with:'
          : `You will have an appointment in ${time} minutes with:`
      );
    }
  }, [time, activeAppointment]);

  const anotherDoctorLastName = useMemo(
    () =>
      user.role === roles.local
        ? activeAppointment?.remoteDoctor?.lastName
        : activeAppointment?.localDoctor?.lastName,
    [user, activeAppointment]
  );

  return (
    <>
      {activeAppointment && (
        <Call>
          <Wrapper>
            <Info />
            <InfoText>
              <p>{title}</p>
              <p>
                <Name>{`${activeAppointment.patient?.firstName} ${activeAppointment.patient?.lastName}`}</Name>
                <span> and </span>
                <Name> Dr. {anotherDoctorLastName}</Name>
              </p>
            </InfoText>
          </Wrapper>
          <InfoButton
            onClick={() =>
              navigate(`${routes.patientCard}/${activeAppointment.patientId}`)
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
