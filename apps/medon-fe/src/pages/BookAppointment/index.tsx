import { useState } from 'react';

import { Wrapper, Choose } from 'pages/BookAppointment/styles';

import BookAppointmentCalendar from 'components/BookAppointmentCalendar';
import PatientInfo from 'components/PatientInfo';
import Steps from 'components/Steps';

import { patient } from 'utils/mock/patientNote';

export default function BookAppointment() {
  const [selectedDate, setSelectedDate] = useState<null | Date>(null);

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
        <Steps selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <BookAppointmentCalendar setSelectedDate={setSelectedDate} />
      </Choose>
    </Wrapper>
  );
}
