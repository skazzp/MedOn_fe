import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useGetActiveAppointmentsQuery } from 'redux/api/appointmentsApi';
import { setCurrentAppointment } from 'redux/features/currentAppointmentSlice/currentAppointmentSlice';
import { useAppDispatch } from 'redux/hooks';
import {
  currentAppointmentTimeFlag,
  currentAppointmentTimeout,
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
          currentAppointmentTimeFlag
      )
        dispatch(setCurrentAppointment(appointments?.data?.[0]));
      else {
        dispatch(setCurrentAppointment(null));
      }
    }, currentAppointmentTimeout);

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
