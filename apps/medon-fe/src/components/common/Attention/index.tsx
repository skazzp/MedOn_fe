import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  Call,
  Info,
  InfoText,
  Wrapper,
  Name,
  InfoButton,
} from 'components/common/Attention/styles';
import { roles, routes, formatTimeDifference } from 'utils/constants';
import { Appointment, IUser } from 'redux/api/types';
import { useEffect, useState } from 'react';

interface IAttentionProps {
  appointment: Appointment;
  user: IUser;
}

export function Attention({ appointment, user }: IAttentionProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [time, setTime] = useState<string>(
    formatTimeDifference(appointment.startTime)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTimeDifference(appointment.startTime));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  let title: string;
  if (new Date(appointment.startTime) < new Date()) {
    title = 'Appointment has already started with:';
  } else title = `You will have an appointment in ${time} minutes with:`;

  const anotherDoctorLastName =
    user.role === roles.local
      ? appointment.remoteDoctor?.lastName
      : appointment.localDoctor?.lastName;

  const link = `${routes.patientCard}/${appointment.patientId}`;

  return (
    <Call>
      <Wrapper>
        <Info />
        <InfoText>
          <p>{title}</p>
          <p>
            <Name>{`${appointment.patient?.firstName} ${appointment.patient?.lastName}`}</Name>
            <span> and </span>
            <Name> Dr. {anotherDoctorLastName}</Name>
          </p>
        </InfoText>
      </Wrapper>
      <InfoButton onClick={() => navigate(link)}>
        {t('attention.detail')}
      </InfoButton>
    </Call>
  );
}

export default Attention;
