export interface IPatientCardNotes {
  date: string;
  time: string;
  note: string;
  doctor: {
    firstName?: string;
    lastName: string;
  };
}

export interface ShowMoreTextHookReturnType {
  formatedText?: string;
  showMore?: boolean;
  isShowMorePossible?: boolean;
  handleShowToggle?: () => void;
}

export interface IPatientNote {
  id: number;
  note: string;
  doctorId: number;
  patientId: number;
  createdAt: string;
  updatedAt: string;
  doctor: {
    firstName: string;
    lastName: string;
  };
}
