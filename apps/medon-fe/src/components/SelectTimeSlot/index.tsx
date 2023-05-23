import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { timeSlots } from 'utils/constants/options/hourOptions';
import { Container, DrText, SlotActive, TimeSlot, TimeText } from './styles';
import { SelectTimeSlotProps } from './types';

export default function SelectTimeSlot({
  selectedTime,
  setIsActive,
  isActive,
  selectTimeAppointments,
  data,
  setSelectedDoctorsById,
}: SelectTimeSlotProps) {
  const { t } = useTranslation();
  const [timeSlotsAvailability, setTimeSlotsAvailability] = useState<{
    [doctorId: number]: boolean[];
  }>({});

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const availability: { [doctorId: number]: boolean[] } = {};

      data.forEach((slot) => {
        const { doctor } = slot;
        const startTime = new Date(slot.startTime).getHours();
        const endTime = new Date(slot.endTime).getHours();

        if (!availability[doctor.id]) {
          availability[doctor.id] = timeSlots.map(() => false);
        }

        for (let i = startTime; i < endTime; i += 1) {
          availability[doctor.id][i] = true;
        }
      });

      setTimeSlotsAvailability(availability);
    }
  }, [data]);

  const selectTime = (time: string) => {
    const doctorAvailability = Object.entries(timeSlotsAvailability);

    if (
      doctorAvailability.some(
        ([doctorId, availability]) => availability[timeSlots.indexOf(time)]
      )
    ) {
      selectTimeAppointments(time);
      setIsActive(time);

      const selectedDoctorsIds = doctorAvailability
        .filter(
          ([doctorId, availability]) => availability[timeSlots.indexOf(time)]
        )
        .map(([doctorId]) => parseInt(doctorId, 10));

      setSelectedDoctorsById(selectedDoctorsIds);
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
