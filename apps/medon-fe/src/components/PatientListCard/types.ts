export interface IPatientListCardProps {
  id: number;
  firstName: string;
  lastName: string;
  content: string;
  maxLength: number;
  doctor: string;
  time: string;
  gender: string;
  dateOfBirth: string;
  overview?: string;
}

export interface ShowMoreTextHookReturnType {
  formattedText: string;
  showMore: boolean;
  handleShowToggle: () => void;
}
