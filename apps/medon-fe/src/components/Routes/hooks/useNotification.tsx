import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useGetActiveAppointmentsQuery } from 'redux/api/appointmentsApi';
import {
  setCurrentAppointment,
  setUpcomingAppointment,
} from 'redux/features/notificationSlice/notificationSlice';
import { useAppDispatch } from 'redux/hooks';
import {
  notificationTimeFlag,
  notificationTimeout,
  getTimeDifference,
} from 'utils/constants';

export function useNotification(userId: number | null | undefined) {
  const dispatch = useAppDispatch();

  const { data: appointments, refetch } = useGetActiveAppointmentsQuery({
    userId,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const upcoming = appointments?.data?.filter(
        (appointment) =>
          getTimeDifference(appointment.startTime) < notificationTimeFlag &&
          getTimeDifference(appointment.startTime) > 0
      );

      upcoming?.length
        ? dispatch(setUpcomingAppointment(upcoming[0]))
        : dispatch(setUpcomingAppointment(null));

      const current = appointments?.data?.filter(
        (appointment) =>
          getTimeDifference(appointment.startTime) < 0 &&
          getTimeDifference(appointment.endTime) > 0
      );

      current?.length
        ? dispatch(setCurrentAppointment(current[0]))
        : dispatch(setCurrentAppointment(null));
    }, notificationTimeout);

    return () => {
      clearInterval(interval);
    };
  }, [appointments]);

  useEffect(() => {
    const client = io(`${process.env.NX_API_URL}/notification`);

    client.emit('subscribeToAppointments', userId);
    client.on('appointmentsHaveChanged', refetch);

    return () => {
      client.close();
    };
  }, []);
}
