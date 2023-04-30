import { useTranslation } from 'react-i18next';

import { Age, Location, Mail, MaleSex, Phone } from 'assets/svgs/patientCard';

import { Info, Wrapper } from './styles';
import { IPatientCardInfoProps } from './types';

export default function PatientCardInfo(data: IPatientCardInfoProps) {
  const { t } = useTranslation();

  return (
    <>
      <Wrapper>
        <Info>
          <Phone />
          {data?.data?.phoneNumber}
        </Info>
        <Info>
          <Mail />
          {data?.data?.email}
        </Info>
      </Wrapper>
      <Wrapper>
        <Info>
          <MaleSex />
          {data?.data?.gender}
        </Info>
        <Info>
          <Age />
          {`${data.formattedAge} ${t('patient-card.suffix-age')}`}
        </Info>
        <Info>
          <Location />
          {data?.data?.city} {data?.data?.country}
        </Info>
      </Wrapper>
    </>
  );
}
