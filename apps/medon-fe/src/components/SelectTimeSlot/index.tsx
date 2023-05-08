import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { timeSlots } from 'utils/constants/options/hourOptions';
import { Container, DrText, SlotActive, TimeSlot, TimeText } from './styles';

export default function SelectTimeSlot() {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState<string>('');
  const selectTime = (key: string) => {
    if (key === isActive) {
      setIsActive('');
    } else {
      setIsActive(key);
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
