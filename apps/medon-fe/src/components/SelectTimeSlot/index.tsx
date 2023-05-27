import { timeSlots } from 'utils/constants/options/hourOptions';
import { useSelectTimeSlot } from './hook';
import { Container, DrText, SlotActive, TimeSlot, TimeText } from './styles';
import { SelectTimeSlotProps } from './types';

export default function SelectTimeSlot(props: SelectTimeSlotProps) {
  const { timeSlotsAvailability, selectTime, t, isActive } =
    useSelectTimeSlot(props);

  return (
    <Container>
      {timeSlots.map((timeSlot, index) => {
        const isSlotAvailable = Object.values(timeSlotsAvailability).some(
          (availability) => availability[index]
        );

        if (!isSlotAvailable) {
          return null;
        }

        const doctorCount = Object.values(timeSlotsAvailability)
          .map((availability) => availability[index])
          .filter(Boolean).length;

        return (
          <TimeSlot
            onClick={() => selectTime(timeSlot)}
            key={timeSlot}
            style={isActive === timeSlot ? SlotActive : {}}
          >
            <TimeText>{timeSlot}</TimeText>
            <DrText>
              <span>{t('appointment.availableDr')}</span>
              <span>{doctorCount}</span>
            </DrText>
          </TimeSlot>
        );
      })}
    </Container>
  );
}
