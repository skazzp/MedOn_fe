import { Appointment, IUser } from 'redux/api/types';

export const enum NotificationType {
  Current = 'current',
  Upcoming = 'upcoming',
}

export const enum TimerType {
  CountDown = 'countdown',
  Counter = 'counter',
}

export interface INotification {
  user: IUser;
  appointment: Appointment;
  timerType: TimerType;
  renderTitle: (timer: string) => string;
  type: NotificationType;
}
