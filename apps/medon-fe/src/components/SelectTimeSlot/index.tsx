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
import { useEffect, useState } from 'react';

export default function SelectTimeSlot({
  setIsActive,
  isActive,
  selectTimeAppointments,
  data,
  setUniqDocId,
}: SelectTimeSlotProps) {
  const { t } = useTranslation();
  const [timeSlotsAvailability, setTimeSlotsAvailability] = useState<{
    [doctorId: number]: boolean[];
  }>({});
  const hours = data.data;
  const doctorIds = hours.map((slot: any) => slot.doctorId);

  useEffect(() => {
    const DocId = new Set(doctorIds);

    if (hours && Array.isArray(hours)) {
      const availability: { [doctorId: number]: boolean[] } = {};

      hours.forEach((slot: any) => {
        const { doctorId } = slot;
        const startTime = new Date(slot.startTime).getHours();
        const endTime = new Date(slot.endTime).getHours();

        if (!availability[doctorId]) {
          availability[doctorId] = timeSlots.map(() => false);
        }

        for (let i = startTime; i < endTime; i += 1) {
          availability[doctorId][i] = true;
        }
      });
      setUniqDocId(DocId);
      setTimeSlotsAvailability(availability);
    }
  }, [doctorIds, hours, setUniqDocId]);

  const selectTime = (time: string) => {
    const doctorAvailability = Object.values(timeSlotsAvailability);

    if (
      doctorAvailability.some(
        (availability) => availability[timeSlots.indexOf(time)]
      )
    ) {
      selectTimeAppointments(time);
      setIsActive(time);
    }
  };

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
