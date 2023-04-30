import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { useAppSelector } from 'redux/hooks';
import { getUserSelector } from 'redux/features/userSlice/userSelectors';
import PatientListCard from 'components/PatientListCard';
import { patientList } from 'utils/mock/patientList';
import {
  TimeIcon,
  Wrapper,
  TextTime,
  ShowMore,
} from 'components/Appointments/styles';
import { timeMessages } from 'components/Appointments/types';
import { roles } from 'utils/constants';

export default function AppointmentsList() {
  const { t } = useTranslation();
  const user = useAppSelector(getUserSelector);

  const sortedPatientList = patientList
    .filter((patient) =>
      user.role === roles.remote ? patient.doctor === user.lastName : true
    )
    .sort((a, b) => a.time.localeCompare(b.time));

  const [visibleCount, setVisibleCount] = useState(3);

  return (
    <Wrapper>
      {sortedPatientList.slice(0, visibleCount).map((patient, index) => {
        const timeMessage = timeMessages[patient.time] || '';

        return (
          <div key={patient.id}>
            <TextTime>
              <TimeIcon />
              {` #${index + 1}${timeMessage}`}
            </TextTime>
            <PatientListCard {...patient} />
          </div>
        );
      })}
      {visibleCount < sortedPatientList.length && (
        <ShowMore onClick={() => setVisibleCount(visibleCount + 3)}>
          {t('dashboard.show')}
        </ShowMore>
      )}
    </Wrapper>
  );
}
