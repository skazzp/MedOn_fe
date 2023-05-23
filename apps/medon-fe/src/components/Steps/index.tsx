import { useTranslation } from 'react-i18next';

import {
  positionBooking,
  positionNext,
  positionPrevious,
} from 'utils/constants/position';
import {
  Button,
  Cancel,
  Selected,
  StepsScore,
  Wrapper,
} from 'components/Steps/styles';
import { StepsProps } from 'components/BookAppointmentCalendar/types';
import { steps } from 'utils/constants/steps';
import { useNavigate } from 'react-router-dom';
import { routes } from 'utils/constants';
import getDoctorFullName from './hook';

function Steps(props: StepsProps) {
  const {
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
        {selectedDate ? selectedDate.toDateString() : t('patient-info.none')}
        {selectedTime ? `, ${selectedTime}` : ''}
        {selectedDoctor ? `, ${getDoctorFullName(selectedDoctor)}` : ''}
      </Selected>
      <Cancel disabled={!selectedDate} onClick={handleCancel}>
        {t('patient-info.cancel')}
      </Cancel>
    </Wrapper>
  );
}

export default Steps;
