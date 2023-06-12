import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ShowMore } from 'components/ShowMore';

import { useGetPatientNotesQuery } from 'redux/api/patientApi';

import { routes } from 'utils/constants/routes';
import { getAgeByDateOfBirth } from 'utils/functions/getAgeByDateOfBirth';
import {
  Body,
  CameraIcon,
  Container,
  GenderText,
  Header,
  Options,
  ProfileIcon,
  StyledLink,
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

  const { data: notes } = useGetPatientNotesQuery({
    id: String(id),
    page: 1,
    limit: 1,
  });

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
          <StyledLink to={`${routes.patientCard}/${id}`}>
            <span>{`${firstName} ${lastName}`}</span>
          </StyledLink>
          <span>
            <GenderText>{gender}</GenderText>,{' '}
            {getAgeByDateOfBirth(dateOfBirth)} {t('patient-list.age-suffix')}
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
        <ShowMore
          overview={overview}
          lastNote={notes?.data?.notes[0]?.note}
          prefixOverview={`${t('patient-list.overview')}`}
          prefixLastNote={`${t('patient-list.last-note')}`}
        />
      </Body>
    </Container>
  );
}
