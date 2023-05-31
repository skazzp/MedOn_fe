import { useTranslation } from 'react-i18next';

import { Age, Location, Mail, MaleSex, Phone } from 'assets/svgs/patientCard';
import { getAgeByDateOfBirth } from 'utils/functions/getAgeByDateOfBirth';

import { Info, Wrapper, Header, StyledButton } from './styles';
import { IPatientCardInfoProps } from './types';
import React from 'react';
import { ChatIcon } from 'assets/svgs/patientCard';
import { toggleWidget } from 'react-chat-widget';

export default function PatientCardInfo({
  phoneNumber,
  email,
  city,
  dateOfBirth,
  gender,
  country,
  firstName,
  lastName,
  activeAppointmentId,
}: IPatientCardInfoProps) {
  const { t } = useTranslation();

  return (
    <>
      <Header>
        <h1>
          {firstName} {lastName}
        </h1>
        {activeAppointmentId && (
          <StyledButton size="large" onClick={toggleWidget}>
            <span>Chat</span>
            <ChatIcon />
          </StyledButton>
        )}
      </Header>

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
