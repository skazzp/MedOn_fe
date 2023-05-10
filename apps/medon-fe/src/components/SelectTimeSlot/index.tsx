import { useTranslation } from 'react-i18next';

import { SelectTimeSlotProps } from 'components/SelectTimeSlot/types';
import {
  Container,
  DrText,
  SlotActive,
  TimeSlot,
  TimeText,
} from 'components/SelectTimeSlot/styles';

import { timeSlots } from 'utils/constants/options/hourOptions';

export default function SelectTimeSlot({
  selectedTime,
  setIsActive,
  isActive,
  selectTimeAppointments,
}: SelectTimeSlotProps) {
  const { t } = useTranslation();

  const selectTime = (time: string) => {
    if (time === selectedTime) {
      selectTimeAppointments('');
    } else {
      selectTimeAppointments(time);
    }

    if (time === isActive) {
      setIsActive('');
    } else {
      setIsActive(time);
    }
  };

  return (
    <Container>
      {timeSlots.map((timeSlot) => (
        <TimeSlot
          onClick={() => selectTime(timeSlot)}
          key={timeSlot}
          style={isActive === timeSlot ? SlotActive : {}}
        >
          <TimeText>{timeSlot}</TimeText>
          <DrText>
            <span>{t('appointment.availableDr')}</span>
            <span> 0</span> {/* value will come from db */}
          </DrText>
        </TimeSlot>
      ))}
    </Container>
  );
}
