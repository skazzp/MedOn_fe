import { Input, Skeleton } from 'antd';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AnimateHeight, { Height } from 'react-animate-height';

import { LinkGoBack } from 'components/common/LinkGoBack';
import Button from 'components/Button';
import PatientCardNotes from 'components/PatientCardNotes';
import { TextareaAntD } from 'components/common';

import { addPatientNoteSchema } from 'validation/addPatientNoteSchema';

import { options } from 'utils/constants/options/patientCardSelect';
import { formatTime, formatDate, formatAge } from 'utils/functions';

import { PatientNote } from 'interfaces/patients';

import {
  Age,
  Location,
  Mail,
  MaleSex,
  Phone,
  Edit,
  AddNote,
  Close,
} from 'assets/svgs/patientCard';
import { useGetPatientByIdQuery } from 'redux/api/patientApi';

import {
  AddNoteForm,
  Buttons,
  Calendar,
  Container,
  Info,
  Overview,
  StyledSelect,
  Top,
  Wrapper,
  SkeletonContainer,
} from './styles';
import { SubmitAddNote } from './types';
import { useShowMoreText } from './hooks';

export default function PatientCard() {
  const [height, setHeight] = useState<Height>(0);

  const { id } = useParams();
  const { data, isLoading } = useGetPatientByIdQuery({ id });

  const { formatedText, showMore, handleShowToggle } = useShowMoreText(
    data?.data?.overview
  );
  const { formattedAge } = formatAge(data?.data?.dateOfBirth);

  const { handleSubmit, control } = useForm<SubmitAddNote>({
    resolver: yupResolver(addPatientNoteSchema),
  });

  const { t } = useTranslation();
  const theme = useTheme();

  const handleAddNote: SubmitHandler<SubmitAddNote> = () => {
    // add logic here
  };

  if (isLoading)
    return (
      <SkeletonContainer>
        <Skeleton active avatar round />
        <Skeleton active title />
        <Skeleton active paragraph />
        <Skeleton active paragraph />
        <Skeleton active paragraph />
      </SkeletonContainer>
    );

  return (
    <Container>
      <Top>
        <LinkGoBack>{t('patient-card.link-back')}</LinkGoBack>
        <Link to="#">
          {t('patient-card.edit')}
          <Edit />
        </Link>
      </Top>
      <h1>
        {data?.data?.firstName} {data?.data?.lastName}
      </h1>
      <Wrapper>
        <Info>
          <Phone />
          {data?.data?.phoneNumber}
        </Info>
        <Info>
          <Mail />
          {data?.data?.email}
        </Info>
      </Wrapper>
      <Wrapper>
        <Info>
          <MaleSex />
          {data?.data?.gender}
        </Info>
        <Info>
          <Age />
          {`${formattedAge} ${t('patient-card.suffix-age')}`}
        </Info>
        <Info>
          <Location />
          {data?.data?.city} {data?.data?.country}
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
        onClick={() => setHeight(height === 0 ? 'auto' : 0)}
      >
        {t('patient-card.button')}
      </Button>
      <AnimateHeight height={height}>
        <AddNoteForm onSubmit={handleSubmit(handleAddNote)}>
          <TextareaAntD
            name="note"
            control={control}
            minRows={6}
            placeholder={`${t('patient-card.notes.placeholder')}`}
          />
          <Buttons>
            <Button
              textcolor={theme.colors.white}
              bgcolor={theme.colors.btnGradient}
            >
              {t('patient-card.notes.add-button')}
              <AddNote />
            </Button>
            <Button
              type="button"
              textcolor={theme.colors.gray_700}
              bgcolor={theme.colors.gray_400}
              onClick={() => setHeight(height === 0 ? 'auto' : 0)}
            >
              <Close />
              {t('patient-card.notes.cancel-button')}
            </Button>
          </Buttons>
        </AddNoteForm>
      </AnimateHeight>
      <h5>{t('patient-card.medical')}</h5>
      <Wrapper>
        <Input.Search
          size="large"
          placeholder={`${t('patient-card.search-input-placeholder')}`}
        />
        <StyledSelect defaultValue="latest" options={options} size="large" />
      </Wrapper>
      {data?.data?.notes.length ? (
        data?.data?.notes.map((note: PatientNote) => (
          <PatientCardNotes
            key={note.id}
            note={note.note}
            date={formatDate(note.createdAt)}
            time={formatTime(note.createdAt)}
            doctor={note.doctor}
          />
        ))
      ) : (
        <span>{t('patient-card.notes.empty-notes')}</span>
      )}
    </Container>
  );
}
