import { IAvailability } from "redux/api/types";

export interface SelectDoctorProps {
    selectedDoctor: number | null;
    selectDoctorAppointments: (key: number | null) => void;
    isActiveDoc: number | null;
    setIsActiveDoc: (key: number | null) => void;
    data: IAvailability[];
    selectedDoctorsById: number[];
}