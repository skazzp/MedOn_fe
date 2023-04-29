export interface IPatientListCardProps {
  id?: number;
  firstName: string;
  lastName: string;
  sex: string;
  age: string;
  content: string;
  maxLength: number;
  doctor: string;
  time: string;
}

export interface ShowMoreTextHookReturnType {
  formatedText: string;
  showMore: boolean;
  handleShowToggle: () => void;
}
