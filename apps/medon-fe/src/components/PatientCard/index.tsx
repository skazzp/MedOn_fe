import { Input, Modal } from 'antd';
import { useState } from 'react';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { LinkGoBack } from 'components/common/LinkGoBack';
import Button from 'components/Button';
import PatientCardNotes from 'components/PatientCardNotes';

// mocks
import { options } from 'utils/constants/options/patientCardSelect';
import { patient } from 'utils/mock/patientNote';

import {
  Age,
  Location,
  Mail,
  MaleSex,
  Phone,
  Edit,
} from 'assets/svgs/patientCard';

import {
  Calendar,
  Container,
  Info,
  Overview,
  StyledSelect,
  Top,
  Wrapper,
} from './styles';
import { useFormatData, useFormatNotesData, useShowMoreText } from './hooks';

export default function PatientCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { formatedText, showMore, handleShowToggle } = useShowMoreText(
    patient.overview
  );
  const { formattedGender, formattedName, formattedAge } =
    useFormatData(patient);
  const { formattedNotes } = useFormatNotesData();

  const { t } = useTranslation();
  const theme = useTheme();

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
      <Container>
        <Top>
          <LinkGoBack>{t('patient-card.link-back')}</LinkGoBack>
          <Link to="#">
            {t('patient-card.edit')}
            <Edit />
          </Link>
        </Top>
        <h1>{formattedName}</h1>
        <Wrapper>
          <Info>
            <Phone />
            {patient.phoneNumber}
          </Info>
          <Info>
            <Mail />
            {patient.email}
          </Info>
        </Wrapper>
        <Wrapper>
          <Info>
            <MaleSex />
            {formattedGender}
          </Info>
          <Info>
            <Age />
            {`${formattedAge} ${t('patient-card.suffix-age')}`}
          </Info>
          <Info>
            <Location />
            {patient.address}
          </Info>
        </Wrapper>
        <h4>{t('patient-card.overview')}</h4>
        <Overview>
          <p>{formatedText}</p>
          <button onClick={handleShowToggle}>
            {!showMore ? t('show.more') : t('show.less')}
          </button>
        </Overview>
        {/* TODO: add calendar here */}
        <Calendar>Calendar</Calendar>
        {/* TODO: add calendar here */}
        <Button
          isfullwidth="true"
          textcolor={theme.colors.blue_500}
          bgcolor={theme.colors.blue_100}
          onClick={showModal}
        >
          {t('patient-card.button')}
        </Button>
        <Wrapper>
          <Input.Search
            size="large"
            placeholder={`${t('patient-card.search-input-placeholder')}`}
          />
          <StyledSelect defaultValue="latest" options={options} size="large" />
        </Wrapper>
        {formattedNotes.length ? (
          formattedNotes.map((note) => (
            <PatientCardNotes
              key={note.id}
              note={note.note}
              date={note.formattedDate}
              time={note.formattedTime}
              doctor={note.doctor}
            />
          ))
        ) : (
          <span>{t('patient-card.notes.empty-notes')}</span>
        )}
      </Container>
      <Modal
        title={t('patient-card.modal')}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input.TextArea
          autoSize={{
            minRows: 4,
            maxRows: 8,
          }}
        />
      </Modal>
    </>
  );
}
