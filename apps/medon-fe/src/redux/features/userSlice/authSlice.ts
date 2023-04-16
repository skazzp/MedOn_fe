import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'redux/api/types';

interface IAuthState {
    user: IUser | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: IAuthState = {
    user: null,
    token: null,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.isLoading = true;
        },
        setUser: (state, action: PayloadAction<{ user: IUser; token: string }>) => {
            const { user, token } = action.payload;
            state.isLoading = false;
            state.error = null;
            state.user = user;
            state.token = token;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: () => initialState,
    },
});

export const { loginRequest, setUser, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;