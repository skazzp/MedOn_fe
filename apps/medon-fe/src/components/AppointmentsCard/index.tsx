import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Modal, Skeleton } from 'antd';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
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
import {
  appointmentTimeFormat,
  roles,
  routes,
  timeFormat,
} from 'utils/constants';
import { toastConfig } from 'utils/toastConfig';

import { useSendLinkMutation } from 'redux/api/appointmentsApi';
import { useAppSelector } from 'redux/hooks';
import { getUserSelector } from 'redux/features/userSlice/userSelectors';

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
  localDoctor,
  role,
  ...rest
}: IAppointmentsCardProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm<AddLink>({
    resolver: yupResolver(addLinkSchema),
  });

  const [sendLink, { isLoading }] = useSendLinkMutation();
  const { hideModal, isVisible, showModal } = useModal(false);
  const user = useAppSelector(getUserSelector);

  const addLinkSubmit: SubmitHandler<AddLink> = ({ link: linkValue }) => {
    sendLink({ id, link: linkValue })
      .unwrap()
      .then(() => {
        toast.success(t('dashboard.link-success'), toastConfig);
        hideModal();
      })
      .catch(() => {
        toast.error(t('dashboard.link-error'), toastConfig);
      });
  };

  if (isLoading) <Skeleton avatar />;

  return (
    <>
      <Time>
        <Clock />
        {dayjs(startTime).format(timeFormat)} -{' '}
        {dayjs(endTime).format(timeFormat)} /{' '}
        {dayjs(startTime).format(appointmentTimeFormat)}
      </Time>
      <Container isLinkAdded={isLinkAdded} id={id} {...rest}>
        <Header>
          <Info>
            <Number>
              {t('appointment.preffix-id')} {id}
            </Number>
            <Patient>
              <Name>
                {patient?.firstName?.charAt(0)}. {patient?.lastName}
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
            {user.role === roles.local ? (
              <>
                {t('appointment.preffix-remote')}
                <strong>
                  {t('appointment.prefix-doctor')} {remoteDoctor?.lastName}
                </strong>
              </>
            ) : (
              <>
                {t('appointment.preffix-local')}
                <strong>
                  {t('appointment.prefix-doctor')} {localDoctor?.lastName}
                </strong>
              </>
            )}
          </RemoteAssign>
          {isLinkAdded && role === roles.local && (
            <Button
              textcolor={theme.colors.blue_500}
              bgcolor={theme.colors.blue_100}
              onClick={() => showModal()}
            >
              {t('appointment.add-link')}
            </Button>
          )}
          <Link to={`${routes.patientCard}/${patient?.id}`}>
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
