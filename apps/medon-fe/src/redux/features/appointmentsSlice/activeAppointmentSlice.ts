import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appointment } from 'redux/api/types';
import { RootState } from 'redux/store';

const init: { activeAppointment: Appointment | null } = {
  activeAppointment: null,
};

export const activeAppointmentSlice = createSlice({
  initialState: init,
  name: 'activeAppointment',
  reducers: {
    setActiveAppointment: (
      state,
      action: PayloadAction<Appointment | null>
    ) => {
      state.activeAppointment = action.payload;
    },
  },
});

export default activeAppointmentSlice.reducer;

export const { setActiveAppointment } = activeAppointmentSlice.actions;

export const getActiveAppointment = (state: RootState) =>
  state.appointmentState.activeAppointment;
