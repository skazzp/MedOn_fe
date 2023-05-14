import { useTranslation } from 'react-i18next';

import {
  Back,
  Container,
  MaleIcon,
  FemaleIcon,
  LeftArrow,
  LocationIcon,
  MailIcon,
  MainInfo,
  Names,
  NoteIcon,
  Patient,
  PhoneIcon,
  SupplementaryInfo,
} from 'components/PatientInfo/styles';
import { Gender, routes } from 'utils/constants';
import { getAgeByDateOfBirth } from 'utils/functions/getAgeByDateOfBirth';
import { PatientInfoProps } from './types';

function PatientInfo({
  firstName,
  lastName,
  phoneNumber,
  email,
  gender,
  dateOfBirth,
  city,
  country,
}: PatientInfoProps) {
  const { t } = useTranslation();

  return (
    <Container>
      <Back to={routes.dashboard}>
        <LeftArrow />
        {t('patient-info.back')}
      </Back>
      <Patient>
        <Names>{`${firstName} ${lastName}`}</Names>
        <MainInfo>
          <PhoneIcon />
          <p>
            <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
          </p>
          <MailIcon />
          <p>
            <a href={`mailto:${email}`}>{email}</a>
          </p>
        </MainInfo>
        <SupplementaryInfo>
          {gender === Gender.Male ? <MaleIcon /> : <FemaleIcon />}
          <p>{`${gender}`}</p>
          <NoteIcon />{' '}
          <p>
            {`${getAgeByDateOfBirth(dateOfBirth)} `}
            {t('patient-card.suffix-age')}
          </p>
          <LocationIcon /> <p>{`${city},${country}`}</p>
        </SupplementaryInfo>
      </Patient>
    </Container>
  );
}

export default PatientInfo;
