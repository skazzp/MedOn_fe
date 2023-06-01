import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import { Appointment } from './types';
import { AppDispatch, RootState } from 'redux/store';

interface IAppointmentsState {
  appointments: Appointment[];
  isConnected: boolean;
}

const init: IAppointmentsState = { appointments: [], isConnected: false };

export const subscribeToAppointments = createAsyncThunk<
  boolean,
  number | null,
  { dispatch: AppDispatch; state: RootState }
>(
  'notification/subscribeToAppointments',
  async (userId: number | null, { dispatch, getState }) => {
    const { isConnected } = getState().appointments;
    if (!isConnected) {
      console.log('Socket connection');
      const client = io(`${process.env.NX_API_URL}/notification`);

      client.emit('subscribeToAppointments', userId);
      client.on('appointments', (data) => {
        dispatch(setAppointments(data));
      });
    }
    return true;
  }
);

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
      state.isConnected = action.payload;
    });

    builder.addCase(subscribeToAppointments.rejected, (state, action) => {
      state.isConnected = false;
    });
  },
});

export default appointmentsSlice.reducer;

export const { setAppointments } = appointmentsSlice.actions;
