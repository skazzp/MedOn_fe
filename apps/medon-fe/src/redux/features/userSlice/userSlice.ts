import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from 'redux/api/types';

interface IUserState {
  user: IUser;
  token: string | null;
  isVerified: boolean;
}

export const initialState: IUserState = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
    role: null,
    speciality: null,
    photo: '',
    dateOfBirth: null,
    isVerified: false,
    country: null,
    city: '',
    timeZone: null,
    id: '',
  },
  token: null,
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

export const { logout, setUser, setToken, setIsVerified } = userSlice.actions;