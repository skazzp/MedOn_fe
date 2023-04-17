import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'redux/api/types';

interface IUserState {
  user: IUser;
  token: string | null;
}

const initialState: IUserState = {
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
    time_zone: null,
    id: '',
  },
  token: null,
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
  },
});

export default userSlice.reducer;

export const { logout, setUser, setToken } = userSlice.actions;
