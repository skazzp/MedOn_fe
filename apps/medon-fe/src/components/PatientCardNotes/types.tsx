export interface IPatientCardNotes {
  date: string;
  time: string;
  note: string;
  doctor: string;
}

export interface ShowMoreTextHookReturnType {
  formatedText: string;
  showMore: boolean;
  handleShowToggle: () => void;
}
