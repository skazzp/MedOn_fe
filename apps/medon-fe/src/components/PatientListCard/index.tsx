import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ShowMore } from 'components/ShowMore';

import { routes } from 'utils/constants/routes';
import { getAgeByDateOfBirth } from 'utils/functions/getAgeByDateOfBirth';
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

export default function PatientListCard({
  id,
  firstName,
  lastName,
  doctor,
  gender,
  dateOfBirth,
  overview,
}: IPatientListCardProps) {
  const { t } = useTranslation();
  const location = useLocation();

  let doctorLink = null;

  if (location.pathname === routes.dashboard && doctor) {
    doctorLink = (
      <div>
        <CameraIcon />
        <p>{t('patient-list.preffix-remote')} </p> <span>{doctor}</span>
      </div>
    );
  }

  return (
    <Container>
      <Header>
        <Text>
          <Link to={`${routes.patientCard}/${id}`}>
            <span>{`${firstName} ${lastName}`}</span>
          </Link>
          <span>
            {gender}, {getAgeByDateOfBirth(dateOfBirth)}{' '}
            {t('patient-list.age-suffix')}
          </span>
          {doctorLink}
        </Text>
        <Options>
          <Link to={`${routes.patientCard}/${id}`}>
            <ProfileIcon />
          </Link>
        </Options>
      </Header>
      <Body>
        <ShowMore text={overview} />
      </Body>
    </Container>
  );
}
