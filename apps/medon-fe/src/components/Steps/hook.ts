import { mockDoctors } from "components/SelectDoctor/mockData";
import { specialityOptions } from "utils/constants";
import { Doctor } from "./types";

const getDoctorFullName = (doctorId: number) => {
    const doctor: Doctor | undefined = mockDoctors.find((doctors) => doctors.id === doctorId);

    if (doctor) {
        return `${doctor.firstName} ${doctor.lastName} ${specialityOptions[doctor.specialityId].label
            } ${doctor.city} ${doctor.country}`;
    }

    return '';
};

export default getDoctorFullName;