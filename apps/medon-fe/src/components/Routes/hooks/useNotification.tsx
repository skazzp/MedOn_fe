import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useGetActiveAppointmentsQuery } from 'redux/api/appointmentsApi';
import { setActiveAppointment } from 'redux/features/appointmentsSlice/activeAppointmentSlice';
import { useAppDispatch } from 'redux/hooks';
import {
  activeAppointmentTimeFlag,
  activeAppointmentTimeout,
  getTimeDifference,
} from 'utils/constants';

export function useNotification(userId: number | null | undefined) {
  const dispatch = useAppDispatch();

  const { data: appointments, refetch } = useGetActiveAppointmentsQuery({
    userId,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        appointments?.data?.[0] &&
        getTimeDifference(appointments.data[0].startTime) <
          activeAppointmentTimeFlag
      )
        dispatch(setActiveAppointment(appointments?.data?.[0]));
      else {
        dispatch(setActiveAppointment(null));
      }
    }, activeAppointmentTimeout);

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
