import { useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import { getUserSelector } from 'redux/features/userSlice/userSelectors';
import { t } from 'i18next';

import { Wrapper, Choose } from 'pages/BookAppointment/styles';

import BookAppointmentCalendar from 'components/BookAppointmentCalendar';
import PatientInfo from 'components/PatientInfo';
import Steps from 'components/Steps';
import SelectTimeSlot from 'components/SelectTimeSlot';
import SelectDoctor from 'components/SelectDoctor';

import { patient } from 'utils/mock/patientNote';
import { roles } from 'utils/constants';
import { steps } from 'utils/constants/steps';

export default function BookAppointment() {
  const user = useAppSelector(getUserSelector);
  const [selectedDate, setSelectedDate] = useState<null | Date>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isActive, setIsActive] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [isActiveDoc, setIsActiveDoc] = useState<number | null>(null);

  const handleCurrentStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    setIsActive(time);
  };

  const handleSelectDoctor = (key: number | null) => {
    setSelectedDoctor(key);
    setIsActiveDoc(key);
  };

  return (
    <Wrapper>
      {user.role === roles.local ? (
        <>
          <PatientInfo
            firstName={patient.firstName}
            lastName={patient.lastName}
            phoneNumber={patient.phoneNumber}
            email={patient.email}
            gender={patient.gender}
            dateOfBirth={patient.dateOfBirth.toString()}
            city={patient.city}
            country={patient.country}
          />
          <Choose>
            <Steps
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              currentStep={currentStep}
              onCurrentStepChange={handleCurrentStepChange}
              selectedTime={selectedTime}
              selectedDoctor={selectedDoctor}
              isActiveDoc={isActiveDoc}
              selectTimeAppointments={handleSelectTime}
              selectDoctorAppointments={handleSelectDoctor}
            />
            {currentStep === steps.one && (
              <BookAppointmentCalendar
                setSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
              />
            )}
            {currentStep === steps.two && (
              <SelectTimeSlot
                selectedTime={selectedTime}
                selectTimeAppointments={handleSelectTime}
                isActive={isActive}
                setIsActive={setIsActive}
              />
            )}
            {currentStep === steps.three && (
              <SelectDoctor
                selectDoctorAppointments={handleSelectDoctor}
                selectedDoctor={selectedDoctor}
                isActiveDoc={isActiveDoc}
                setIsActiveDoc={setIsActiveDoc}
              />
            )}
          </Choose>
        </>
      ) : (
        t('not-one')
      )}
    </Wrapper>
  );
}
