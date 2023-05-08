import { useState } from 'react';
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

interface StepsProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

function Steps(props: StepsProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { selectedDate, setSelectedDate } = props;
  const { t } = useTranslation();

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleCancel = () => {
    if (selectedDate) {
      setCurrentStep(1);
      setSelectedDate(null);
      // add cancel all what we need
    }
  };

  const handleBooking = () => {
    // add function when will be booking
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <div>{t('patient-info.day')}</div>;
      case 2:
        return <div>{t('patient-info.time')}</div>;
      case 3:
        return <div>{t('patient-info.remote-doctor')}</div>;
      default:
        return null;
    }
  };

  return (
    <Wrapper>
      <StepsScore>
        <div>
          {t('patient-info.step')} {currentStep} / 3
        </div>
        <div>{renderStepContent()}</div>
      </StepsScore>
      {currentStep > 1 && (
        <Button
          buttonType="previous"
          position={positionPrevious}
          onClick={handlePreviousStep}
        >
          {t('patient-info.previous')}
        </Button>
      )}
      {currentStep < 3 ? (
        <Button
          buttonType="next"
          disabled={!selectedDate}
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
        >
          {t('patient-info.booking')}
        </Button>
      )}
      <Selected>
        <div>{t('patient-info.select')}</div>
        {t('patient-info.date')}
        {selectedDate ? selectedDate.toDateString() : t('patient-info.none')}
      </Selected>
      <Cancel disabled={!selectedDate} onClick={handleCancel}>
        {t('patient-info.cancel')}
      </Cancel>
    </Wrapper>
  );
}

export default Steps;
