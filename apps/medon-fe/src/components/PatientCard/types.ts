export interface IPatientCardProps {
  overview: string;
  patient: string;
  phone: string;
  mail: string;
  sex: string;
  age: string;
  location: string;
}

export interface ShowMoreTextHookReturnType {
  formatedText?: string;
  showMore: boolean;
  handleShowToggle: () => void;
}

export interface SubmitAddNote {
  note: string;
}
