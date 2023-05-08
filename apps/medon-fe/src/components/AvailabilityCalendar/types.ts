export interface SelectHours {
  start: number;
  end: number;
}

export interface CalendarSlot {
  start: Date;
  end: Date;
  title: string;
}

export interface AvailabilitySlot {
  startTime: Date;
  endTime: Date;
  title: string;
}