import { Input, Skeleton } from 'antd';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import AnimateHeight, { Height } from 'react-animate-height';
import { toast } from 'react-toastify';
import { io, Socket } from 'socket.io-client';

import { LinkGoBack } from 'components/common/LinkGoBack';
import Button from 'components/Button';
import { TextareaAntD } from 'components/common';
import { PatientNotes } from 'components/PatientNotes';
import PatientCardInfo from 'components/PatientCardInfo';
import { ShowMore } from 'components/ShowMore';
import { PatientCardCalendar } from 'components/PatientCardCalendar';
import { NewPatientForm } from 'components/NewPatientForm';
import { Chat } from 'components/Chat';

import { addPatientNoteSchema } from 'validation/addPatientNoteSchema';

import { toastConfig } from 'utils/toastConfig';
import { options } from 'utils/constants/options/patientCardSelect';

import { Edit, AddNote, Close } from 'assets/svgs/patientCard';
import {
  useCreatePatientNoteMutation,
  useGetPatientByIdQuery,
  useGetPatientNotesQuery,
} from 'redux/api/patientApi';

import { useDebounce } from 'hooks/useDebounce';
import { defaultOrder, defaultPage, defaultPageSize } from 'utils/constants';

import {
  AddNoteForm,
  Buttons,
  Container,
  StyledSelect,
  Top,
  Wrapper,
  SkeletonContainer,
  EditBtn,
} from './styles';
import { SubmitAddNote } from './types';
import { useSocket } from 'components/PatientCard/hooks/useSocket';

export default function PatientCard() {
  const [height, setHeight] = useState<Height>(0);
  const [textValue, setTextValue] = useState<string>('');
  const [editInfo, setEditInfo] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || defaultPage;
  const limit = Number(searchParams.get('limit')) || defaultPageSize;
  const order = searchParams.get('order') || defaultOrder;

  const { id } = useParams();
  const text = useDebounce(textValue, 1000);
  const {
    data: notes,
    isLoading: isNotesLoading,
    isFetching,
  } = useGetPatientNotesQuery({
    id,
    order,
    text,
    page,
    limit,
  });
  const { data: patient, isLoading: isPatientLoading } = useGetPatientByIdQuery(
    { id }
  );
  const [sendData, { isLoading: isNoteSending }] =
    useCreatePatientNoteMutation();
  const { t } = useTranslation();
  const theme = useTheme();
  const { handleSubmit, control, reset } = useForm<SubmitAddNote>({
    resolver: yupResolver(addPatientNoteSchema),
  });
  const { messages, socket, onSubmitMessage } = useSocket({
    appointmentId: 3,
    senderId: 1,
  });

  const handleAddNote: SubmitHandler<SubmitAddNote> = ({ note }) => {
    sendData({ note, patientId: id })
      .unwrap()
      .then(() => {
        toast.success(t('patient-card.toast.success'), toastConfig);
        reset();
      })
      .catch((err) => {
        toast.error(err.data.message, toastConfig);
      });
  };

  if (isPatientLoading && isNotesLoading)
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
      {!editInfo ? (
        <>
          <Top>
            <LinkGoBack>{t('patient-card.link-back')}</LinkGoBack>
            <EditBtn onClick={() => setEditInfo(true)}>
              {t('patient-card.edit')}
              <Edit />
            </EditBtn>
          </Top>
          <PatientCardInfo {...patient?.data} />
          <h4>{t('patient-card.overview')}</h4>
          <ShowMore text={patient?.data?.overview} />
          <PatientCardCalendar />
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
                  isLoading={isNoteSending}
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
              onChange={(e) => {
                setTextValue(e.target.value);
              }}
              loading={isFetching}
            />
            <StyledSelect
              defaultValue={defaultOrder}
              options={options}
              size="large"
              onChange={(changeText) => {
                setSearchParams({ order: changeText as string });
              }}
            />
          </Wrapper>
          <PatientNotes
            isFetching={isFetching}
            notes={notes?.data?.notes}
            total={notes?.data?.total}
          />
        </>
      ) : (
        <NewPatientForm patient={patient?.data} setEditInfo={setEditInfo} />
      )}
      <Chat onSubmitMessage={onSubmitMessage} />
      <Button>Join Chat</Button>
    </Container>
  );
}
