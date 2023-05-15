export interface SelectTimeSlotProps {
    endTime: string | number | Date;
    startTime: string | number | Date;
    selectedTime: string | null;
    selectTimeAppointments: (time: string) => void;
    isActive: string | '';
    setIsActive: React.Dispatch<React.SetStateAction<string>>;
    data: any;
    setUniqDocId: (id: any) => void;
}