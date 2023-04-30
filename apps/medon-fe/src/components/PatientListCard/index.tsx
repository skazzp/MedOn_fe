import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { routes } from 'utils/constants/routes';
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
import { useShowMoreText } from './hooks';

export default function PatientListCard({
  firstName,
  lastName,
  sex,
  age,
  content,
  doctor,
}: IPatientListCardProps) {
  const { t } = useTranslation();
  const location = useLocation();

  const { formatedText, handleShowToggle, showMore } = useShowMoreText(content);

  let doctorLink = null;

  if (location.pathname === routes.dashboard && doctor) {
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
          <Link to={routes.patientCard}>
            <ProfileIcon />
          </Link>
        </Options>
      </Header>
      <Body>
        <p>{formatedText}</p>
        <button onClick={handleShowToggle}>
          {!showMore ? t('show.more') : t('show.less')}
        </button>
      </Body>
    </Container>
  );
}
