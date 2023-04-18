import { useState } from 'react';
import { Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';

export default function LogOut() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title={t('logout.title')}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <span>{t('logout.description')}</span>
      </Modal>
    </>
  );
}
