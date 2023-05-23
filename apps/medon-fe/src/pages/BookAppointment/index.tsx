import { useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import { getUserSelector } from 'redux/features/userSlice/userSelectors';
import { t } from 'i18next';

import { Wrapper, Choose } from 'pages/BookAppointment/styles';

import BookAppointmentCalendar from 'components/BookAppointmentCalendar';
import Steps from 'components/Steps';
import SelectTimeSlot from 'components/SelectTimeSlot';
import SelectDoctor from 'components/SelectDoctor';

import { roles } from 'utils/constants';
import { steps } from 'utils/constants/steps';
import { IAvailability } from 'redux/api/types';

export default function BookAppointment() {
  const user = useAppSelector(getUserSelector);
  const [selectedDate, setSelectedDate] = useState<null | Date>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isActive, setIsActive] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [isActiveDoc, setIsActiveDoc] = useState<number | null>(null);
  const [data, setData] = useState<IAvailability[]>([]);
  const [selectedDoctorsById, setSelectedDoctorsById] = useState<number[]>([]);

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
            data={data}
            setData={setData}
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
              data={data}
              setSelectedDoctorsById={setSelectedDoctorsById}
            />
          )}
          {currentStep === steps.three && (
            <SelectDoctor
              selectDoctorAppointments={handleSelectDoctor}
              selectedDoctor={selectedDoctor}
              isActiveDoc={isActiveDoc}
              setIsActiveDoc={setIsActiveDoc}
              data={data}
              selectedDoctorsById={selectedDoctorsById}
            />
          )}
        </Choose>
      ) : (
        t('not-one')
      )}
    </Wrapper>
  );
}
