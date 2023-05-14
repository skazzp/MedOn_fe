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
import { mockDoctors } from 'components/SelectDoctor/mockData';
import useSpecOptions from 'components/RegistrationForm/hooks';
import { steps } from 'utils/constants/steps';

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
  const { specialityOptions } = useSpecOptions();

  const handleNextStep = () => {
    onCurrentStepChange(currentStep + steps.one);
  };

  const handlePreviousStep = () => {
    onCurrentStepChange(currentStep - steps.one);
  };

  const handleCancel = () => {
    if (selectedDate) {
      setSelectedDate(null);
      onCurrentStepChange(steps.one);
      selectTimeAppointments('');
      selectDoctorAppointments(null);
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

  const getDoctorFullName = (doctorId: number) => {
    const doctor = mockDoctors.find((doctors) => doctors.id === doctorId);

    if (doctor) {
      return `${doctor.firstName} ${doctor.lastName} ${
        specialityOptions[doctor.specialityId].label
      } ${doctor.city} ${doctor.country}`;
    }

    return '';
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
