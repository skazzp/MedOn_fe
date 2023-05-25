import { BookAppointmentCalendarProps } from "components/BookAppointmentCalendar/types";
import { IAvailability } from "redux/api/types";

export interface ButtonProps {
    buttonType?: 'next' | 'previous' | 'booking';
    position?: number;
};

export interface Doctor {
    id: number;
    firstName: string;
    lastName: string;
    specialityId: number;
    city: string;
    country: string;
};

export interface StepsProps extends BookAppointmentCalendarProps {
    currentStep: number;
    onCurrentStepChange: (step: number) => void;
    selectedTime: Date | string | null;
    selectedDoctor: number | null;
    isActiveDoc: number | null;
    selectTimeAppointments: (time: string) => void;
    selectDoctorAppointments: (key: number | null) => void;
    data: IAvailability[];
    setData: React.Dispatch<React.SetStateAction<IAvailability[]>>;
    startTime: Date | string;
    endTime: Date | string;
}
