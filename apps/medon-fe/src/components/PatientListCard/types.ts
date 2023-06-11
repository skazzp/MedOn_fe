export interface IPatientListCardProps {
  id: number;
  firstName: string;
  lastName: string;
  maxLength: number;
  doctor: string;
  time: string;
  gender: string;
  dateOfBirth: string;
  overview?: string;
  note?: string;
}

export interface ShowMoreTextHookReturnType {
  formattedText?: string;
  showMore?: boolean;
  isShowMorePossible?: boolean;
  handleShowToggle?: () => void;
}
