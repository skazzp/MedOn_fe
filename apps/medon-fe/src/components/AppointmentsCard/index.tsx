import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import AnimateHeight, { Height } from 'react-animate-height';

import { ReactComponent as Profile } from 'assets/svgs/profile_listcard.svg';
import { ReactComponent as Camera } from 'assets/images/Camera.svg';

import { ShowMore } from 'components/ShowMore';
import Button from 'components/Button';

import { getAgeByDateOfBirth } from 'utils/functions/getAgeByDateOfBirth';

import {
  Body,
  Container,
  Header,
  Info,
  Name,
  NotRemoteDoctor,
  Number,
  Patient,
  RemoteAssign,
} from './styles';
import { IAppointmentsCardProps } from './types';

export function AppointmentsCard({
  id,
  link,
  patient,
  remoteDoctor,
  ...rest
}: IAppointmentsCardProps) {
  const [height, setHeight] = useState<Height>(0);

  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Container {...rest}>
      <Header>
        <Info>
          <Number>
            {t('appointment.preffix-id')} {id}
          </Number>
          <Patient>
            <Name>
              {patient?.firstName?.charAt(0)} {patient?.lastName}
            </Name>
            {patient?.gender},
            {getAgeByDateOfBirth(String(patient?.dateOfBirth))}{' '}
            {t('appointment.suffix-age')}
          </Patient>
        </Info>
        {remoteDoctor ? (
          <RemoteAssign>
            <Camera />
            Remote -{' '}
            <strong>
              {t('appointment.prefix-doctor')} {remoteDoctor?.lastName}
            </strong>
          </RemoteAssign>
        ) : (
          <NotRemoteDoctor to="#">Sign a Medical list</NotRemoteDoctor>
        )}
        <Link to="#">
          <Profile />
        </Link>
      </Header>
      <Body>
        <ShowMore text={patient?.overview} prefix="Overview: " />
        <Button
          textcolor={theme.colors.blue_500}
          bgcolor={theme.colors.blue_100}
          onClick={() => setHeight(height === 0 ? 'auto' : 0)}
        >
          Add Link
        </Button>
      </Body>
      <AnimateHeight height={height}>
        <input name="link" />
      </AnimateHeight>
    </Container>
  );
}
