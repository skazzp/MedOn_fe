import dayjs from 'dayjs';
import { Event } from 'react-big-calendar';

import { IAppointmentsCardProps } from 'components/AppointmentsCard/types';

import { getUserSelector } from 'redux/features/userSlice/userSelectors';
import { useAppSelector } from 'redux/hooks';

import { timeFormat } from 'utils/constants';
import { getCapitalize } from 'utils/functions/getCapitalize';

export function useGetCalendarEvents(
  getCalendarAppointments?: IAppointmentsCardProps[]
) {
  const user = useAppSelector(getUserSelector);

  if (!getCalendarAppointments) {
    return [];
  }

  const events = getCalendarAppointments.map((appointment): Event => {
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
      isColor:
        user.id === Number(appointment.localDoctor?.id) ||
        user.id === Number(appointment.remoteDoctor?.id),
    };

    return { start, end, title, resource };
  });

  return events;
}
