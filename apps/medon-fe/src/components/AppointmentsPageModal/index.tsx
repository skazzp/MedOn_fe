import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { dateInputFormat, timeFormat } from 'utils/constants';

import { Details, Entity, ProfileIcon, StyledModal } from './styles';
import { IAppointmentsPageModalProps } from './types';

export function AppointmentsPageModal({
  selectedEvent,
  hideModal,
  isVisible,
}: IAppointmentsPageModalProps) {
  const { t } = useTranslation();

  return (
    <StyledModal
      title={selectedEvent?.title}
      centered
      open={isVisible}
      onOk={hideModal}
      onCancel={hideModal}
    >
      <Details>
        <span>{t('appointments.details.patient')}</span>
        <Entity>
          <p>{selectedEvent?.resource?.patient}</p>
          <ProfileIcon />
        </Entity>
        <span>{t('appointments.details.doctor')}</span>
        <p>
          {t('appointments.details.local')}{' '}
          {selectedEvent?.resource?.localDoctor}
        </p>
        <span>{t('appointments.details.doctor')}</span>
        <p>
          {t('appointments.details.remote')}{' '}
          {selectedEvent?.resource?.remoteDoctor}
        </p>
        <span>{t('appointments.details.date')}</span>
        <p>
          {dayjs(selectedEvent?.start).format(dateInputFormat)}{' '}
          {t('appointments.details.starts')}{' '}
          {dayjs(selectedEvent?.start).format(timeFormat)}
        </p>
      </Details>
    </StyledModal>
  );
}
