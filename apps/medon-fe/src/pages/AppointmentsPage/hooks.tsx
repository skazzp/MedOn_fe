import dayjs from 'dayjs';
import { Event } from 'react-big-calendar';

import { IAppointmentsCardProps } from 'components/AppointmentsCard/types';

import { timeFormat } from 'utils/constants';
import { getCapitalize } from 'utils/functions/getCapitalize';

export function useGetCalendarEvents(
  getPastAppointments?: IAppointmentsCardProps[]
) {
  if (!getPastAppointments) {
    return [];
  }
  const events = getPastAppointments.map((appointment): Event => {
    const start = appointment.startTime;
    const end = appointment.endTime;
    const title = `${dayjs(appointment.startTime).format(timeFormat)} - ${dayjs(
      appointment.endTime
    ).format(timeFormat)}`;

    const resource = {
      id: appointment.id,
      patient: `${getCapitalize(
        appointment.patient?.firstName
      )} ${getCapitalize(appointment.patient?.lastName)}`,
      localDoctor: getCapitalize(appointment.localDoctor?.lastName),
      remoteDoctor: getCapitalize(appointment.remoteDoctor?.lastName),
    };

    return { start, end, title, resource };
  });

  return events;
}
