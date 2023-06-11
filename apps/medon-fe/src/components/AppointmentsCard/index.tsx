import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import { ReactComponent as Profile } from 'assets/svgs/profile_listcard.svg';
import { ReactComponent as Camera } from 'assets/images/Camera.svg';
import { ReactComponent as Clock } from 'assets/images/Time.svg';

import Button from 'components/Button';
import { AddLinkModal } from 'components/AppointmentsCardAddModal';
import { RemoteAppointmentModal } from 'components/AppointmentsCardRemoveModal';
import { ShowMore } from 'components/ShowMore';

import { useModal } from 'hooks/useModal';

import {
  getAgeByDateOfBirth,
  getCapitalize,
  isDeleteAvailable,
} from 'utils/functions';

import {
  appointmentTimeFormat,
  roles,
  routes,
  timeFormat,
} from 'utils/constants';

import { useAppSelector } from 'redux/hooks';
import { getUserSelector } from 'redux/features/userSlice/userSelectors';

import { IAppointmentsCardProps } from './types';
import {
  Body,
  Container,
  Header,
  Icons,
  Info,
  Name,
  Number,
  Patient,
  RemoteAssign,
  Time,
  TrashBin,
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
  meetingCount,
  ...rest
}: IAppointmentsCardProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  const {
    hideModal: hideAddModal,
    isVisible: isAddVisible,
    showModal: showAddModal,
  } = useModal(false);
  const {
    hideModal: hideRemoveModal,
    isVisible: isRemoveVisible,
    showModal: showRemoveModal,
  } = useModal(false);

  const user = useAppSelector(getUserSelector);

  return (
    <>
      <Time>
        <Clock />
        {dayjs(startTime).format(timeFormat)} -{' '}
        {dayjs(endTime).format(timeFormat)} /{' '}
        {dayjs(startTime).format(appointmentTimeFormat)}
      </Time>
      <Container
        isLinkAdded={isLinkAdded}
        id={id}
        meetingCount={meetingCount}
        {...rest}
      >
        <Header>
          <Info>
            <Number>
              {t('appointment.preffix-id')} {meetingCount}
            </Number>
            <Patient>
              <Name>
                {patient?.firstName?.charAt(0)}. {patient?.lastName}
              </Name>
              {getCapitalize(patient?.gender)},{' '}
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
              onClick={showAddModal}
            >
              {t('appointment.add-link')}
            </Button>
          )}
          <Icons>
            <Link to={`${routes.patientCard}/${patient?.id}`}>
              <Profile />
            </Link>
            {isDeleteAvailable(endTime) && (
              <TrashBin onClick={showRemoveModal} />
            )}
          </Icons>
        </Header>
        <Body>
          <ShowMore
            overview={patient?.overview}
            prefixOverview={`${t('appointment.preffix-overview')}`}
          />
        </Body>
        <AddLinkModal
          id={id}
          hideAddModal={hideAddModal}
          isAddVisible={isAddVisible}
        />
        <RemoteAppointmentModal
          id={id}
          hideRemoveModal={hideRemoveModal}
          isRemoveVisible={isRemoveVisible}
          showRemoveModal={showRemoveModal}
        />
      </Container>
    </>
  );
}
