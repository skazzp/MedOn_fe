export interface IPatientListCardProps {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  overview?: string;
}

export interface ShowMoreTextHookReturnType {
  formattedText?: string;
  showMore?: boolean;
  isShowMorePossible?: boolean;
  handleShowToggle?: () => void;
}
