import { useTranslation } from 'react-i18next';

import { Age, Location, Mail, MaleSex, Phone } from 'assets/svgs/patientCard';
import { getAgeByDateOfBirth } from 'utils/functions/getAgeByDateOfBirth';

import { Info, Wrapper } from './styles';
import { IPatientCardInfoProps } from './types';

export default function PatientCardInfo({
  phoneNumber,
  email,
  city,
  dateOfBirth,
  gender,
  country,
  firstName,
  lastName,
}: IPatientCardInfoProps) {
  const { t } = useTranslation();

  return (
    <>
      <h1>
        {firstName} {lastName}
      </h1>
      <Wrapper>
        <Info>
          <Phone />
          {phoneNumber}
        </Info>
        <Info>
          <Mail />
          {email}
        </Info>
      </Wrapper>
      <Wrapper>
        <Info>
          <MaleSex />
          {gender}
        </Info>
        <Info>
          <Age />
          {`${getAgeByDateOfBirth(String(dateOfBirth))} ${t(
            'patient-card.suffix-age'
          )}`}
        </Info>
        <Info>
          <Location />
          {city} {country}
        </Info>
      </Wrapper>
    </>
  );
}
