export interface BookAppointmentCalendarProps {
    setSelectedDate: (date: null | Date) => void;
    selectedDate: Date | null;
}

export interface StepsProps extends BookAppointmentCalendarProps {
    currentStep: number;
    onCurrentStepChange: (step: number) => void;
    selectedTime: string | null;
    selectedDoctor: number | null;
    isActiveDoc: number | null;
    selectTimeAppointments: (time: string) => void;
    selectDoctorAppointments: (key: number | null) => void;
    data: any;
    setData: React.Dispatch<React.SetStateAction<any>>;
}