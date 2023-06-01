import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import { Appointment } from './types';
import { AppDispatch, RootState } from 'redux/store';

interface IAppointmentsState {
  appointments: Appointment[];
  socket: Socket | null;
}

const init: IAppointmentsState = { appointments: [], socket: null };

export const subscribeToAppointments = createAsyncThunk<
  Socket,
  number,
  { dispatch: AppDispatch; state: RootState }
>(
  'notification/subscribeToAppointments',
  async (userId: number, { dispatch, getState }) => {
    const { socket } = getState().appointments;

    if (socket) return socket;

    const client = io(`${process.env.NX_API_URL}/notification`);

    client.emit('subscribeToAppointments', userId);

    client.on('appointments', (data) => {
      dispatch(setAppointments(data));
    });

    return client;
  }
);

export const unsubscribeToAppointments = createAsyncThunk<
  null,
  number,
  { dispatch: AppDispatch; state: RootState }
>('notification/subscribeToAppointments', async (_, { dispatch, getState }) => {
  const { socket } = getState().appointments;

  if (socket) {
    socket.removeAllListeners();
    socket.close();
  }

  return null;
});

export const appointmentsSlice = createSlice({
  initialState: init,
  name: 'appointments',
  reducers: {
    setAppointments: (state, action: PayloadAction<Appointment[]>) => {
      state.appointments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(subscribeToAppointments.fulfilled, (state, action) => {
      state.socket = action.payload;
    });

    builder.addCase(subscribeToAppointments.rejected, (state, action) => {
      state.socket = null;
    });

    builder.addCase(unsubscribeToAppointments.fulfilled, (state, action) => {
      state.socket = action.payload;
    });
  },
});

export default appointmentsSlice.reducer;

export const { setAppointments } = appointmentsSlice.actions;
