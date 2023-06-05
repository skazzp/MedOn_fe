import { Appointment, IUser } from 'redux/api/types';

export interface INotification {
  user: IUser;
  appointment: Appointment;
  timerType: 'countdown' | 'counter';
  renderTitle: (timer: string) => string;
  type: 'current' | 'upcoming';
}
