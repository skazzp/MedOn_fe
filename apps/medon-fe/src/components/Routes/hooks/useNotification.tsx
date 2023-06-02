import { useEffect } from 'react';
import { io } from 'socket.io-client';

export function useNotification(
  userId: number | null | undefined,
  refetchCallback: () => void
) {
  useEffect(() => {
    const client = io(`${process.env.NX_API_URL}/notification`);

    client.emit('subscribeToAppointments', userId);
    client.on('appointmentsHaveChanged', refetchCallback);

    return () => {
      client.close();
    };
  }, []);
}
