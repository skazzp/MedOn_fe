import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import DropdownMenu from 'components/Dropdown';

import { Body, Container, Header, Options, ProfileIcon, Text } from './styles';
import { IPatientListCardProps } from './types';

export default function PatientListCard({
  firstName,
  lastName,
  sex,
  age,
  content,
  maxLength,
}: IPatientListCardProps) {
  const [showMore, setShowMore] = useState(false);

  const { t } = useTranslation();

  const handleToggle = () => {
    setShowMore(!showMore);
  };

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
          <Link to="#">
            <ProfileIcon />
          </Link>
          <DropdownMenu />
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
