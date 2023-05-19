import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ReactComponent as Profile } from 'assets/svgs/profile_listcard.svg';
import { ReactComponent as Camera } from 'assets/images/Camera.svg';

import Button from 'components/Button';
import { ShowMore } from 'components/ShowMore';
import { InputAntD } from 'components/common';

import { useModal } from 'hooks/useModal';

import { getAgeByDateOfBirth } from 'utils/functions/getAgeByDateOfBirth';

import { addLinkSchema } from 'validation/addLinkDashBoard';

import {
  Body,
  Container,
  Header,
  Info,
  Name,
  Number,
  Patient,
  RemoteAssign,
} from './styles';
import { AddLink, IAppointmentsCardProps } from './types';

export function AppointmentsCard({
  id,
  link,
  patient,
  isLinkAdded,
  remoteDoctor,
  ...rest
}: IAppointmentsCardProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  const { hideModal, isVisible, showModal } = useModal(false);

  const { handleSubmit, control } = useForm<AddLink>({
    resolver: yupResolver(addLinkSchema),
  });

  const addLinkSubmit: SubmitHandler<AddLink> = () => {
    // TODO: Integration add Link to DashBoard
  };

  return (
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
            {patient?.gender},
            {getAgeByDateOfBirth(String(patient?.dateOfBirth))}{' '}
            {t('appointment.suffix-age')}
          </Patient>
        </Info>
        <RemoteAssign>
          {isLinkAdded && link && (
            <Link to={link}>
              <Camera />
            </Link>
          )}
          Remote -
          <strong>
            {t('appointment.prefix-doctor')} {remoteDoctor?.lastName}
          </strong>
        </RemoteAssign>
        {!isLinkAdded && (
          <Button
            textcolor={theme.colors.blue_500}
            bgcolor={theme.colors.blue_100}
            onClick={() => showModal()}
          >
            Add Link
          </Button>
        )}
        <Link to="#">
          <Profile />
        </Link>
      </Header>
      <Body>
        <ShowMore text={patient?.overview} prefix="Overview: " />
      </Body>
      <Modal
        title="Add Link to Zoom Call"
        open={isVisible}
        onOk={handleSubmit(addLinkSubmit)}
        onCancel={hideModal}
      >
        <InputAntD control={control} name="link" />
      </Modal>
    </Container>
  );
}
