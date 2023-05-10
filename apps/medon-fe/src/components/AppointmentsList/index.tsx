import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';

import { useAppSelector } from 'redux/hooks';
import { getUserSelector } from 'redux/features/userSlice/userSelectors';
import PatientListCard from 'components/PatientListCard';
import {
  TimeIcon,
  Wrapper,
  TextTime,
  ShowMore,
} from 'components/AppointmentsList/styles';
import { timeMessages } from 'components/AppointmentsList/types';
import { getSortedPatientList } from 'utils/functions/sort';

export default function AppointmentsList() {
  const { t } = useTranslation();
  const user = useAppSelector(getUserSelector);
  const [visibleCount, setVisibleCount] = useState<number>(3);

  const sortedPatientList = useMemo(() => getSortedPatientList(user), [user]);

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
