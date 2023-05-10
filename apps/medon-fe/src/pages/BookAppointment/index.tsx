import { useState } from 'react';

import { Wrapper, Choose } from 'pages/BookAppointment/styles';

import BookAppointmentCalendar from 'components/BookAppointmentCalendar';
import PatientInfo from 'components/PatientInfo';
import Steps from 'components/Steps';

import { patient } from 'utils/mock/patientNote';
import SelectTimeSlot from 'components/SelectTimeSlot';
import SelectDoctor from 'components/SelectDoctor';

export default function BookAppointment() {
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
        {currentStep === 1 && (
          <BookAppointmentCalendar
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
          />
        )}
        {currentStep === 2 && (
          <SelectTimeSlot
            selectedTime={selectedTime}
            selectTimeAppointments={handleSelectTime}
            isActive={isActive}
            setIsActive={setIsActive}
          />
        )}
        {currentStep === 3 && (
          <SelectDoctor
            selectDoctorAppointments={handleSelectDoctor}
            selectedDoctor={selectedDoctor}
            isActiveDoc={isActiveDoc}
            setIsActiveDoc={setIsActiveDoc}
          />
        )}
      </Choose>
    </Wrapper>
  );
}
