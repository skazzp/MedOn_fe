export interface IAppointmentsCardProps {
  id?: number;
  link?: string;
  startTime?: Date;
  endTime?: Date;
  localDoctorId?: number;
  // REMOTE DOCTOR
  remoteDoctor?: {
    lastName?: string;
  };
  isAssigned?: boolean;
  // I NEED TO ADD THIS
  // PATIENT
  patient?: {
    dateOfBirth?: Date;
    firstName?: string;
    lastName?: string;
    gender?: string;
    overview?: string;
  };
}
