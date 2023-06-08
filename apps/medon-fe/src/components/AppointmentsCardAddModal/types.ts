export interface AddLink {
  link: string;
}

export interface AppointmentsCardAddModalProps {
  id: string;
  hideAddModal: () => void;
  isAddVisible: boolean;
}
