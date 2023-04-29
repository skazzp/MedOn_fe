import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Body,
  CameraIcon,
  Container,
  Header,
  Options,
  ProfileIcon,
  Text,
} from './styles';
import { IPatientListCardProps } from './types';

interface IPatientListCardPropsWithDoctorName extends IPatientListCardProps {
  doctorName?: string;
}

export default function PatientListCard({
  firstName,
  lastName,
  sex,
  age,
  content,
  maxLength,
  doctor,
}: IPatientListCardPropsWithDoctorName) {
  const [showMore, setShowMore] = useState(false);

  const { t } = useTranslation();
  const location = useLocation();

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  let doctorLink = null;

  if (location.pathname === '/dashboard' && doctor) {
    doctorLink = (
      <div>
        <CameraIcon />
        <p>Remote </p> <span>{doctor}</span>
      </div>
    );
  }

  return (
    <Container>
      <Header>
        <Text>
          <span>{`${firstName.charAt(0)}. ${lastName}`}</span>
          <span>
            {sex}, {age} {t('patient-list.age-suffix')}
          </span>
          {doctorLink}
        </Text>
        <Options>
          <Link to="#">
            <ProfileIcon />
          </Link>
        </Options>
      </Header>
      <Body>
        <p>{showMore ? content : `${content.slice(0, maxLength)}...`}</p>
        <button onClick={handleToggle}>
          {showMore ? t('patient-list.show.less') : t('patient-list.show.more')}
        </button>
      </Body>
    </Container>
  );
}
