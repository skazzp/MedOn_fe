export interface IAppointmentsCardProps {
  id: string;
  link?: string;
  startTime?: Date;
  endTime?: Date;
  // REMOTE DOCTOR
  remoteDoctor?: {
    firstName?: string;
    lastName?: string;
  };
  localDoctor?: {
    firstName?: string;
    lastName?: string;
  };
  isLinkAdded?: boolean;
  // I NEED TO ADD THIS
  // PATIENT
  patient?: {
    id?: string;
    dateOfBirth?: Date;
    firstName?: string;
    lastName?: string;
    gender?: string;
    overview?: string;
  };
  role?: string;
}
