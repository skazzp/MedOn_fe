import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useNavigate } from 'react-router-dom';

import { useGetAvailabilityByDayMutation } from 'redux/api/availabilityApi';

import {
  Button,
  Cancel,
  Selected,
  StepsScore,
  Wrapper,
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
  } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  dayjs.extend(utc);
  dayjs.extend(timezone);
  const userTimezone = dayjs.tz.guess();

  const dateInText = dayjs(selectedDate).format(dateToTextFormat);
  const [isSlotAvailable, setIsSlotAvailable] = useState<boolean>(false);

  const [getAvailabilityByDay, { data }] = useGetAvailabilityByDayMutation();

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
      const SlotIsAvailable = data.data.some((slot) => {
        const slotStartTime = dayjs(slot.startTime);
        const slotDay = slotStartTime.startOf('day');

        return slotDay.isSame(selectedDay, 'day');
      });

      setData(data.data);
      setIsSlotAvailable(SlotIsAvailable);
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
      navigate(routes.patientCard);
    }
  };

  const handleBooking = () => {
    // add function when will be booking
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
          disabled={currentStep === steps.three && !isActiveDoc}
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
          <div>
            {isButtonActive ? t('patient-info.have-doctor') : noMeetingsMessage}
          </div>
        )}
      </Selected>
      <Cancel disabled={!selectedDate} onClick={handleCancel}>
        {t('patient-info.cancel')}
      </Cancel>
    </Wrapper>
  );
}

export default Steps;
