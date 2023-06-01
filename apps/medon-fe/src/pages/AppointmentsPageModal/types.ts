import { Event } from 'react-big-calendar';

export interface IAppointmentsPageModalProps {
  isVisible: boolean;
  hideModal: () => void;
  selectedEvent: Event | null;
}
