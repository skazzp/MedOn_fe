import { timeSlots } from 'utils/constants/options/hourOptions';
import { Container, DrText, SlotActive, TimeSlot, TimeText } from './styles';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
          <DrText>{t('appointment.availableDr')}5</DrText>
        </TimeSlot>
      ))}
    </Container>
  );
}
