import { timeSlots } from 'utils/constants/options/hourOptions';
import dayjs from 'dayjs';
import { useSelectTimeSlot } from './hook';
import { Container, DrText, SlotActive, TimeSlot, TimeText } from './styles';
import { SelectTimeSlotProps } from './types';

export default function SelectTimeSlot(props: SelectTimeSlotProps) {
  const { timeSlotsAvailability, selectTime, t, isActive, selectedDate } =
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

        const doctorCount = Object.values(timeSlotsAvailability).filter(
          (availability) => availability[index]
        ).length;

        const currentTime = dayjs();
        const selectedDateTime = dayjs(selectedDate)
          .hour(+timeSlot.split(':')[0])
          .minute(0);
        const isPastTime = selectedDateTime.isBefore(currentTime, 'hour');
        const isToday = selectedDateTime.isSame(currentTime, 'day');

        if (isToday && isPastTime) {
          return null;
        }

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
