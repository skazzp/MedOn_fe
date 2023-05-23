export interface UseModalReturn {
  isVisible: boolean;
  showModal: () => void;
  hideModal: () => void;
}

export interface SubmitAddNote {
  note: string;
}
