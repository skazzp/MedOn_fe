import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ReactComponent as Profile } from 'assets/svgs/profile_listcard.svg';
import { ReactComponent as Camera } from 'assets/images/Camera.svg';
import { ReactComponent as Clock } from 'assets/images/Time.svg';

import Button from 'components/Button';
import { ShowMore } from 'components/ShowMore';
import { InputAntD } from 'components/common';

import { useModal } from 'hooks/useModal';

import { getAgeByDateOfBirth } from 'utils/functions/getAgeByDateOfBirth';
import { timeFormat } from 'utils/constants';

import { addLinkSchema } from 'validation/addLinkDashBoard';

import { AddLink, IAppointmentsCardProps } from './types';
import {
  Body,
  Container,
  Header,
  Info,
  Name,
  Number,
  Patient,
  RemoteAssign,
  Time,
} from './styles';

export function AppointmentsCard({
  id,
  link,
  startTime,
  endTime,
  patient,
  isLinkAdded,
  remoteDoctor,
  ...rest
}: IAppointmentsCardProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm<AddLink>({
    resolver: yupResolver(addLinkSchema),
  });

  const { hideModal, isVisible, showModal } = useModal(false);

  const addLinkSubmit: SubmitHandler<AddLink> = () => {
    // TODO: Integration add Link to DashBoard
  };

  return (
    <>
      <Time>
        <Clock />
        {dayjs(startTime).format(timeFormat)} -{' '}
        {dayjs(endTime).format(timeFormat)}
      </Time>
      <Container isLinkAdded={isLinkAdded} {...rest}>
        <Header>
          <Info>
            <Number>
              {t('appointment.preffix-id')} {id}
            </Number>
            <Patient>
              <Name>
                {patient?.firstName?.charAt(0)} {patient?.lastName}
              </Name>
              {patient?.gender},{' '}
              {getAgeByDateOfBirth(String(patient?.dateOfBirth))}{' '}
              {t('appointment.suffix-age')}
            </Patient>
          </Info>
          <RemoteAssign>
            {!isLinkAdded && (
              <Link to={String(link)}>
                <Camera />
              </Link>
            )}
            {t('appointment.preffix-remote')}
            <strong>
              {t('appointment.prefix-doctor')} {remoteDoctor?.lastName}
            </strong>
          </RemoteAssign>
          {isLinkAdded && (
            <Button
              textcolor={theme.colors.blue_500}
              bgcolor={theme.colors.blue_100}
              onClick={() => showModal()}
            >
              {t('appointment.add-link')}
            </Button>
          )}
          <Link to="#">
            <Profile />
          </Link>
        </Header>
        <Body>
          <ShowMore
            text={patient?.overview}
            prefix={`${t('appointment.preffix-overview')}`}
          />
        </Body>
        <Modal
          title={t('appointment.modal-title')}
          open={isVisible}
          onOk={handleSubmit(addLinkSubmit)}
          onCancel={hideModal}
        >
          <InputAntD
            control={control}
            name="link"
            placeholder={`${t('appointment.modal-placeholder')}`}
          />
        </Modal>
      </Container>
    </>
  );
}
