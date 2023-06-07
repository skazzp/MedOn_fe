import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useDeleteAppointmentMutation } from 'redux/api/appointmentsApi';

import { toastConfig } from 'utils/toastConfig';

import { AppointmentsCardRemoveModalProps } from './types';
import { StyledModal } from './styles';

export function RemoteAppointmentModal({
  id,
  hideRemoveModal,
  isRemoveVisible,
}: AppointmentsCardRemoveModalProps) {
  const { t } = useTranslation();

  const [sendData] = useDeleteAppointmentMutation();

  const handleDeleteAppointment = async () => {
    await sendData({ id })
      .unwrap()
      .then(() => {
        toast.success(t('appointment.remove-modal-success'), toastConfig);
        hideRemoveModal();
      })
      .catch(() => {
        toast.error(t('appointment.remove-modal-error'), toastConfig);
      });
  };

  return (
    <StyledModal
      title={t('appointment.remove-modal-title')}
      open={isRemoveVisible}
      onOk={handleDeleteAppointment}
      onCancel={hideRemoveModal}
    >
      <span>{t('appointment.remove-modal-message')}</span>
    </StyledModal>
  );
}
