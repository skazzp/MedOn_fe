import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { routes } from 'utils/constants/routes';

import { getAgeByDateOfBirth } from 'utils/functions/getAgeByDateOfBirth';
import { Body, Container, Header, Options, ProfileIcon, Text } from './styles';
import { IPatientListCardProps } from './types';
import { useShowMoreText } from './hooks';

export default function PatientListCard({
  id,
  firstName,
  lastName,
  gender,
  dateOfBirth,
  overview,
}: IPatientListCardProps) {
  const { t } = useTranslation();

  const { formattedText, handleShowToggle, showMore } =
    useShowMoreText(overview);

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
        </Text>
        <Options>
          <Link to={`${routes.patientCard}/${id}`}>
            <ProfileIcon />
          </Link>
        </Options>
      </Header>
      {overview && (
        <Body>
          <p>
            <strong>{t('patient-list.overview')}</strong>
            {formattedText}
          </p>
          <button onClick={handleShowToggle}>
            {!showMore ? t('show.more') : t('show.less')}
          </button>
        </Body>
      )}
    </Container>
  );
}
