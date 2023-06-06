import { Modal, Skeleton } from 'antd';
import { InputAntD } from 'components/common';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSendLinkMutation } from 'redux/api/appointmentsApi';
import { addLinkSchema } from 'validation/addLinkDashBoard';
import { toast } from 'react-toastify';
import { toastConfig } from 'utils/toastConfig';

import { AddLink, AppointmentsCardAddModalProps } from './types';

export function AddLinkModal({
  id,
  hideAddModal,
  isAddVisible,
}: AppointmentsCardAddModalProps) {
  const { t } = useTranslation();

  const { handleSubmit, control } = useForm<AddLink>({
    resolver: yupResolver(addLinkSchema),
  });

  const [sendLink, { isLoading }] = useSendLinkMutation();

  const addLinkSubmit: SubmitHandler<AddLink> = ({ link: linkValue }) => {
    sendLink({ id, link: linkValue })
      .unwrap()
      .then(() => {
        toast.success(t('dashboard.link-success'), toastConfig);
        hideAddModal();
      })
      .catch(() => {
        toast.error(t('dashboard.link-error'), toastConfig);
      });
  };

  if (isLoading) <Skeleton avatar />;

  return (
    <Modal
      title={t('appointment.modal-title')}
      open={isAddVisible}
      onOk={handleSubmit(addLinkSubmit)}
      onCancel={hideAddModal}
    >
      <InputAntD
        control={control}
        name="link"
        placeholder={`${t('appointment.modal-placeholder')}`}
      />
    </Modal>
  );
}
