import { DateLocalizer } from "react-big-calendar";

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
  startTime: Date | string;
  endTime: Date | string;
  title?: string;
}

export interface UpdateAvailabilityDTO {
  toDelete: AvailabilitySlot[];
  toCreate: AvailabilitySlot[];
  timezone: string;
}
export interface RBCFormatProps {
  date: Date;
  culture: string | undefined;
  localizer: DateLocalizer | undefined;
}
