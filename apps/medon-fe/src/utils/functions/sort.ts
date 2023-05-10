import { IUser } from "redux/api/types";
import { roles } from "utils/constants";
import { patientList } from "utils/mock/patientList";

export function getSortedPatientList(user: IUser) {
    return patientList
        .filter((patient) => user.role === roles.remote ? patient.doctor === user.lastName : true)
        .sort((a, b) => a.time.localeCompare(b.time));
}