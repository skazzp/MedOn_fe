import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appointment } from 'redux/api/types';
import { RootState } from 'redux/store';

interface INotification {
  currentAppointment: Appointment | null;
  upcomingAppointment: Appointment | null;
}

const init: INotification = {
  currentAppointment: null,
  upcomingAppointment: null,
};

export const currentAppointmentSlice = createSlice({
  initialState: init,
  name: 'currentAppointment',
  reducers: {
    setCurrentAppointment: (
      state,
      action: PayloadAction<Appointment | null>
    ) => {
      state.currentAppointment = action.payload;
    },
    setUpcomingAppointment: (
      state,
      action: PayloadAction<Appointment | null>
    ) => {
      state.upcomingAppointment = action.payload;
    },
  },
});

export default currentAppointmentSlice.reducer;

export const { setCurrentAppointment } = currentAppointmentSlice.actions;

export const getCurrentAppointment = (state: RootState) =>
  state.appointmentState.currentAppointment;
