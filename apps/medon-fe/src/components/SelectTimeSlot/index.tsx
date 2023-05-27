import { timeSlots } from 'utils/constants/options/hourOptions';
import { useSelectTimeSlot } from './hook';
import { Container, DrText, SlotActive, TimeSlot, TimeText } from './styles';
import { SelectTimeSlotProps } from './types';

export default function SelectTimeSlot(props: SelectTimeSlotProps) {
  const { timeSlotsAvailability, selectTime, t, isActive } =
    useSelectTimeSlot(props);

  return (
    <Container>
      {timeSlots.map((timeSlot, index) => (
        <TimeSlot
          onClick={() => selectTime(timeSlot)}
          key={timeSlot}
          style={isActive === timeSlot ? SlotActive : {}}
          disabled={
            !Object.values(timeSlotsAvailability).some(
              (availability) => availability[index]
            )
          }
        >
          <TimeText>{timeSlot}</TimeText>
          <DrText>
            <span>{t('appointment.availableDr')}</span>
            <span>
              {
                Object.values(timeSlotsAvailability).filter(
                  (availability) => availability[index]
                ).length
              }
            </span>
          </DrText>
        </TimeSlot>
      ))}
    </Container>
  );
}
