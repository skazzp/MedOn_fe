import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const appointmentsSlice = createSlice({
  initialState: [],
  name: 'appointments',
  reducers: {
    setAppointments: (state, action) => {
      state.appointments = action.payload;
    },
  },
});

export default appointmentsSlice.reducer;

export const { setAppointments } = appointmentsSlice.actions;
