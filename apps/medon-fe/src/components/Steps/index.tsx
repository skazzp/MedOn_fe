import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useGetAvailabilityByDayMutation } from 'redux/api/availabilityApi';
import { getUserSelector } from 'redux/features/userSlice/userSelectors';
import { useAppSelector } from 'redux/hooks';
import { Appointment } from 'redux/api/types';
import { useCreateAppointmentMutation } from 'redux/api/appointmentsApi';

import {
  Button,
  Cancel,
  Selected,
  StepsScore,
  Wrapper,
  Meet,
  LoadingSpinner,
} from 'components/Steps/styles';
import { StepsProps } from 'components/Steps/types';
import { steps } from 'utils/constants/steps';
import getDoctorFullName from 'components/Steps/hook';

import { dateToTextFormat, routes } from 'utils/constants';
import {
  positionBooking,
  positionNext,
  positionPrevious,
} from 'utils/constants/position';
import { toastConfig } from 'utils/toastConfig';

function Steps(props: StepsProps) {
  const {
    setData,
    selectedDate,
    setSelectedDate,
    currentStep,
    onCurrentStepChange,
    selectedTime,
    selectedDoctor,
    isActiveDoc,
    selectTimeAppointments,
    selectDoctorAppointments,
    startTime,
    endTime,
  } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  dayjs.extend(utc);
  dayjs.extend(timezone);
  const userTimezone = dayjs.tz.guess();
  const user = useAppSelector(getUserSelector);
  const { id } = useParams();

  const dateInText = dayjs(selectedDate).format(dateToTextFormat);
  const [isSlotAvailable, setIsSlotAvailable] = useState<boolean>(false);

  const [getAvailabilityByDay, { data, isLoading }] =
    useGetAvailabilityByDayMutation();
  const [createAppointment, { isLoading: createLoading }] =
    useCreateAppointmentMutation();

  const isButtonActive = Boolean(selectedDate && isSlotAvailable);
  const noMeetingsMessage = !isSlotAvailable
    ? t('patient-info.dont-have-doctor')
    : '';

  const handleFetchAvailability = useCallback(() => {
    if (selectedDate) {
      getAvailabilityByDay({
        day: dayjs(selectedDate).tz(userTimezone).toDate(),
        timezone: userTimezone,
      });
    }
  }, [selectedDate, getAvailabilityByDay, userTimezone]);

  useEffect(() => {
    if (selectedDate) {
      handleFetchAvailability();
    }
  }, [selectedDate, handleFetchAvailability]);

  useEffect(() => {
    if (selectedDate && data && data.data) {
      const selectedDay = dayjs(selectedDate).startOf('day');
      const currentTime = dayjs();

      const areAnySlotsAvailable = data.data.some((slot) => {
        const slotStartTime = dayjs(slot.startTime);
        const slotDay = slotStartTime.startOf('day');

        return (
          slot.isAvailable &&
          slotDay.isSame(selectedDay, 'day') &&
          slotStartTime.isSameOrAfter(currentTime)
        );
      });

      setData(data.data);
      setIsSlotAvailable(areAnySlotsAvailable);
    }
  }, [selectedDate, data, setData]);

  const handleNextStep = () => {
    onCurrentStepChange(currentStep + steps.one);
  };

  const handlePreviousStep = () => {
    onCurrentStepChange(currentStep - steps.one);
    selectDoctorAppointments(null);
    selectTimeAppointments('');
  };

  const handleCancel = () => {
    if (selectedDate) {
      setSelectedDate(null);
      onCurrentStepChange(steps.one);
      selectTimeAppointments('');
      selectDoctorAppointments(null);
      navigate(`${routes.patientCard}/${id}`);
    }
  };

  const handleBooking = async () => {
    if (selectedDate && selectedTime && selectedDoctor) {
      const appointmentData: Appointment = {
        link: '',
        startTime,
        endTime,
        localDoctorId: user.id,
        remoteDoctorId: selectedDoctor,
        patientId: Number(id),
        timezone: userTimezone,
      };

      try {
        await createAppointment({
          dto: appointmentData,
          timezone: userTimezone,
        });
        toast.success(t('appointments.create.success'), toastConfig);
        navigate(`${routes.dashboard}`);
      } catch (error) {
        toast.error(t('appointments.create.error'), toastConfig);
      }
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case steps.one:
        return <div>{t('patient-info.day')}</div>;
      case steps.two:
        return <div>{t('patient-info.time')}</div>;
      case steps.three:
        return <div>{t('patient-info.remote-doctor')}</div>;
      default:
        return null;
    }
  };

  return (
    <Wrapper>
      <StepsScore>
        <div>
          {currentStep}
          {t('patient-info.end-steps')}
        </div>
        <div>{renderStepContent()}</div>
      </StepsScore>
      {currentStep > steps.one && (
        <Button
          buttonType="previous"
          position={positionPrevious}
          onClick={handlePreviousStep}
        >
          {t('patient-info.previous')}
        </Button>
      )}
      {currentStep < steps.three ? (
        <Button
          buttonType="next"
          disabled={
            (currentStep === steps.one && !selectedDate) ||
            !isButtonActive ||
            (currentStep === steps.two && !selectedTime)
          }
          position={positionNext}
          onClick={handleNextStep}
        >
          {' '}
          {t('patient-info.next')}
        </Button>
      ) : (
        <Button
          buttonType="booking"
          position={positionBooking}
          onClick={handleBooking}
          disabled={
            (currentStep === steps.three &&
              (!isActiveDoc || !selectedDoctor)) ||
            createLoading
          }
        >
          {t('patient-info.booking')}
        </Button>
      )}
      <Selected>
        <div>{t('patient-info.select')}</div>
        {t('patient-info.date')}
        {selectedDate ? dateInText : t('patient-info.none')}
        {selectedTime ? `, ${selectedTime}` : ''}
        {selectedDoctor && data?.data
          ? `, ${getDoctorFullName(selectedDoctor, data.data)}`
          : ''}

        {selectedDate && (
          <Meet isButtonActive={isButtonActive}>
            {isButtonActive && isLoading ? (
              <LoadingSpinner />
            ) : (
              isButtonActive && t('patient-info.have-doctor')
            )}
            {!isButtonActive && noMeetingsMessage}
          </Meet>
        )}
      </Selected>
      <Cancel disabled={!selectedDate} onClick={handleCancel}>
        {t('patient-info.cancel')}
      </Cancel>
    </Wrapper>
  );
}

export default Steps;
