import { IAvailability } from "redux/api/types";

const getDoctorFullName = (doctorId: number, doctors: IAvailability[]) => {
    const doctor = doctors.find((availability) => availability.doctor.id === doctorId);

    if (doctor && doctor.doctor) {
        const { firstName, lastName, city, country } = doctor.doctor;

        return `${firstName} ${lastName} ${doctor.doctor.speciality.name} ${city} ${country}`;
    }

    return '';
};


export default getDoctorFullName;