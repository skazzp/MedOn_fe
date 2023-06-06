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

export const notificationSlice = createSlice({
  initialState: init,
  name: 'notification',
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

export default notificationSlice.reducer;

export const { setCurrentAppointment, setUpcomingAppointment } =
  notificationSlice.actions;

export const getNotification = (state: RootState) => state.notificationState;
