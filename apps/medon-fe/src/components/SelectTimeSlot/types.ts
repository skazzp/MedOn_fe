import React from "react";
import { IAvailability } from "redux/api/types";

export interface SelectTimeSlotProps {
    selectedTime: string | null;
    selectTimeAppointments: (time: string) => void;
    isActive: string | '';
    setIsActive: React.Dispatch<React.SetStateAction<string>>
    data: IAvailability[];
    setSelectedDoctorsById: React.Dispatch<React.SetStateAction<number[]>>;
}