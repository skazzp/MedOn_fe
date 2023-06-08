import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Views, dayjsLocalizer, Event } from 'react-big-calendar';
import AnimateHeight, { Height } from 'react-animate-height';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Input } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from 'styled-components';

import { AddNote, Close } from 'assets/svgs/patientCard';
import Plus from 'assets/svgs/plus_listcard.svg';

import { Link } from 'components/Link';
import { PatientNotes } from 'components/PatientNotes';
import Button from 'components/Button';
import { TextareaAntD } from 'components/common';
import { Legend } from 'components/Legend';

import { getDateAndHourEvent } from 'utils/functions/getDateAndHourEvent';
import { getDayPropGetter } from 'utils/functions/getDayPropGetter';
import { getEventPropGetter } from 'utils/functions/getEventPropGetter';
import {
  defaultLimit,
  defaultOrder,
  defaultPage,
  maxLengthTextArea,
  roles,
  routes,
} from 'utils/constants';
import { toastConfig } from 'utils/toastConfig';
import { options } from 'utils/constants/options/patientCardSelect';

import { useDebounce } from 'hooks/useDebounce';

import { useAppSelector } from 'redux/hooks';
import {
  useCreatePatientNoteMutation,
  useGetPatientNotesQuery,
} from 'redux/api/patientApi';

import { addPatientNoteSchema } from 'validation/addPatientNoteSchema';

import { useModal } from 'hooks/useModal';

import { PatientNote } from 'interfaces/patients';
import {
  AddNoteForm,
  Buttons,
  MedicalTitle,
  StyledCalendar,
  StyledModal,
  StyledSelect,
  Title,
  Wrapper,
} from './styles';
import { ParamsType, SubmitAddNote } from './types';
import useGetPatientAppointments from './hooks';

export function PatientCardCalendar() {
  const [event, setEvent] = useState<Event>();
  const [height, setHeight] = useState<Height>(0);
  const [textValue, setTextValue] = useState<string>('');
  const [notes, setNotes] = useState<PatientNote[]>([]);
  const { id = '' } = useParams<ParamsType>();
  const { role } = useAppSelector((state) => state.userState.user);
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(defaultPage);
  const order = searchParams.get('order') || defaultOrder;
  const theme = useTheme();

  const text = useDebounce(textValue, 1000);
  const { hideModal, isVisible, showModal } = useModal(false);
  const { data: response, isFetching } = useGetPatientNotesQuery({
    id,
    order,
    text,
    page,
    limit: defaultLimit,
  });
  const [sendData, { isLoading: isNoteSending }] =
    useCreatePatientNoteMutation();
  const appointments = useGetPatientAppointments(id);

  const { handleSubmit, control, reset } = useForm<SubmitAddNote>({
    resolver: yupResolver(addPatientNoteSchema),
  });

  const total = response?.data?.total || 0;
  const newNotes = response?.data?.notes;
  const handleEventSelect = (eventValue: Event) => {
    showModal();
    setEvent(eventValue);
  };

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

  useEffect(() => {
    setPage(defaultPage);
    setNotes([]);
  }, [text, order]);

  useEffect(() => {
    if (newNotes && page !== defaultPage) {
      setNotes((prev) => prev.concat(newNotes));
    }
    if (newNotes && page === defaultPage) {
      setNotes(newNotes);
    }
  }, [newNotes, page]);

  return (
    <>
      <Title>
        <h2>{t('patient-card.calendar.title')}</h2>
        {role === roles.local && (
          <Link
            to={`${routes.patientCardAppointment}`}
            bgcolor={theme.colors.btnGradient}
            textcolor={theme.colors.white}
          >
            {t('patient-card.calendar.link')}
            <img src={Plus} alt={`${t('patient-card.alt-image')}`} />
          </Link>
        )}
      </Title>
      <StyledCalendar
        localizer={dayjsLocalizer(dayjs)}
        defaultView={Views.WEEK}
        views={[Views.WEEK]}
        events={appointments}
        dayPropGetter={getDayPropGetter}
        eventPropGetter={getEventPropGetter}
        onSelectEvent={handleEventSelect}
        popup
        selectable
        timeslots={1}
        step={60}
      />
      <Legend />
      <StyledModal
        title={`${t('patient-card.calendar.prefix-modal')} ${event?.title}`}
        open={isVisible}
        onOk={hideModal}
        cancelButtonProps={{ style: { display: 'none' } }}
        onCancel={hideModal}
      >
        <p>
          <strong>{t('patient-card.calendar.modal-title')} </strong>
          {event?.title}
        </p>
        <p>
          <strong>{t('patient-card.calendar.modal-start')} </strong>
          {getDateAndHourEvent(event?.start)}
        </p>
        <p>
          <strong>{t('patient-card.calendar.modal-end')} </strong>
          {getDateAndHourEvent(event?.end)}
        </p>
        <p>
          <strong>{t('patient-card.calendar.modal-link')} </strong>
          <Link
            bgcolor={theme.colors.transparent}
            textcolor={theme.colors.blue_300}
            to={event?.resource.link}
          >
            {t('patient-card.calendar.modal-name-link')}
          </Link>
        </p>
      </StyledModal>
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
            showCount
            maxLength={maxLengthTextArea}
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
      <MedicalTitle>{t('patient-card.medical')}</MedicalTitle>
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
        notes={notes}
        total={total}
        page={page}
        setPage={setPage}
      />
    </>
  );
}
