export interface IAppointmentsCardProps {
  id: string;
  link?: string;
  startTime?: Date;
  endTime?: Date;
  remoteDoctor?: {
    id?: string;
    firstName?: string;
    lastName?: string;
  };
  localDoctor?: {
    id?: string;
    firstName?: string;
    lastName?: string;
  };
  isLinkAdded?: boolean;
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
