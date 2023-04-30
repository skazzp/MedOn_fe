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

  const { formattedText, handleShowToggle, showMore, isShowMorePossible } =
    useShowMoreText(overview);

  return (
    <Container>
      <Header>
        <Text>
          <span>{`${firstName} ${lastName}`}</span>
          <span>
            {gender},{' '}
            {getAgeByDateOfBirth(dateOfBirth || new Date().toISOString())}
            {t('patient-list.age-suffix')}
          </span>
        </Text>
        <Options>
          <Link to={'/patients/card/' + id}>
            <ProfileIcon />
          </Link>
        </Options>
      </Header>
      <Body>
        <p>{formattedText}</p>
        {isShowMorePossible && (
          <button onClick={handleShowToggle}>
            {!showMore ? t('show.more') : t('show.less')}
          </button>
        )}
      </Body>
    </Container>
  );
}
