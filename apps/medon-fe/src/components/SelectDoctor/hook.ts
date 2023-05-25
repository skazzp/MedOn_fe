import { Doctor } from 'redux/api/types';

export function filterUniqueDoctors(doctors: Doctor[]): Doctor[] {
    return doctors.filter(
        (doctor: Doctor, index: number, self: Doctor[]) =>
            index === self.findIndex((d: Doctor) => d.id === doctor.id)
    );
}