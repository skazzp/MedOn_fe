import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'redux/api/types';

interface IUserState {
  user: IUser;
  token: string | null;
  isVerified: boolean;
}

const initialState: IUserState = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
    role: null,
    specialityId: null,
    photo: '',
    dateOfBirth: null,
    isVerified: false,
    country: null,
    city: '',
    timeZone: null,
    id: '',
  },
  // token: null,
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE2MiwiZW1haWwiOiJza2F6enBAZ21haWwuY29tIiwiaWF0IjoxNjgxOTEzNzY4LCJleHAiOjE2ODE5MjA5Njh9.Prr26ozRZSHwzs_ssBbsZi29qaImluuPDUIib7e2vB8',
  isVerified: false,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setIsVerified: (state, action: PayloadAction<boolean>) => {
      state.isVerified = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;
