
export interface SelectTimeSlotProps {
    selectedTime: string | null;
    selectTimeAppointments: (time: string) => void;
    isActive: string | '';
    setIsActive: React.Dispatch<React.SetStateAction<string>>
}