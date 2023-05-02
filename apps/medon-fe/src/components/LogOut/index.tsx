import { useState } from 'react';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { Logout } from 'components/Navigation/styles';
import { persistedStore } from 'redux/store';
import { useAppDispatch } from 'redux/hooks';
import { logout } from 'redux/features/userSlice/userSlice';
import { BtnStyled } from './style';

export default function LogOut() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    persistedStore.purge();
    dispatch(logout());
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <BtnStyled onClick={showModal}>
        <Logout />
        {t('navigation.logout')}
      </BtnStyled>
      <Modal
        title={t('logout.title')}
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <span>{t('logout.description')}</span>
      </Modal>
    </>
  );
}
