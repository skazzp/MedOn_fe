import React, { useState } from 'react';
import { t } from 'i18next';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';

import termsTemplate from 'components/TermsAndConditions/data';
import { BtnStyled, Container } from './styles';

interface Languages {
  [name: string]: string;
}

export default function TermsAndConditions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { i18n } = useTranslation();
  const lang: string = i18n.language;
  const content: Languages = termsTemplate;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <BtnStyled type="button" onClick={showModal}>
        {t('termsConditions')}
      </BtnStyled>
      <Modal
        style={{ top: 20 }}
        centered
        width={1000}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleOk}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Container>
          <div
            dangerouslySetInnerHTML={{
              __html: content[lang],
            }}
          />
        </Container>
      </Modal>
    </>
  );
}
