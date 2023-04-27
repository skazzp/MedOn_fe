import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { routes } from 'utils/constants/routes';

import { Body, Container, Header, Options, ProfileIcon, Text } from './styles';
import { IPatientListCardProps } from './types';
import { useShowMoreText } from './hooks';

export default function PatientListCard({
  firstName,
  lastName,
  sex,
  age,
  content,
}: IPatientListCardProps) {
  const { t } = useTranslation();

  const { formatedText, handleShowToggle, showMore } = useShowMoreText(content);

  return (
    <Container>
      <Header>
        <Text>
          <span>{`${firstName.charAt(0)}. ${lastName}`}</span>
          <span>
            {sex}, {age} {t('patient-list.age-suffix')}
          </span>
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
